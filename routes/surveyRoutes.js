const mongoose = require('mongoose');
const { Path } = require('path-parser');
const { URL } = require('url');
const _ = require('lodash')
const requireLogin = require('../Middlewares/requireLogin');
const requireCredits = require('../Middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false }); // The select method is where can chain different mongoose methods to the query we are doing,
        // in this case we excluding recipients sub collectio inside survey because could be very big in the future.

        res.send(surveys);
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        // const events = req.body.map(({ url, email }) => {
        //         const pathName = new URL(url).pathname;
        //         const match = p.test(pathName); //Esto va a retornar un JSON si encuentra ambos patrones :surveyId y :choice o retorna NULL
        //         if(match) {
        //             return { email, surveyId: match.surveyId, choice: match.choice } // quiero que me retorne un objeto asi: {email: iohsd@panzer.com, surveyId: hbweiu2343, choice: yes}
        //         }
        //     })
        // //Empty undefined objects
        // const compactEvents = _.compact(events)
        // //Only leave unique values
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        // console.log('Unique', uniqueEvents)

        //With REFACTOR:
        const events = _.chain(req.body)
            .map(({ url, email }) => {
                const pathName = new URL(url).pathname;
                const match = p.test(pathName); //Esto va a retornar un JSON si encuentra ambos patrones :surveyId y :choice o retorna NULL
                if(match) {
                    return { email, surveyId: match.surveyId, choice: match.choice } // quiero que me retorne un objeto asi: {email: iohsd@panzer.com, surveyId: hbweiu2343, choice: yes}
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ email, surveyId, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {email: email, responded: false} //the elemMatch is used because it is a List of objects
                    }
                },
                {
                    $inc: { [choice]: 1 }, //dentro de los parentesis cuadrados se pone choice para que agarre la variable, NO ES UNA LISTA
                    $set: { 'recipients.$.responded': true }, //el $ se refiere al elemMatch encontrado arriba
                    lastResponded: new Date
                }).exec() //Al ser algo asincrono devuelve una promesa, pero no ocupamos esperar nada por que Sendgrid no require que le enviemos ninguna respuesta
            })
            .value();

        console.log(events)
        res.send({})
        
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {        
        const {title, subject, body, recipients} = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()
        });           
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user)
        } catch(err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send("<h1 style='text-align: center; margin-top: 15%;'>Thanks for voting we appreciate your feedback! :)</h1>")
    });
};