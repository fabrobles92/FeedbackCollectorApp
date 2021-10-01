import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"; // reduxForm helper is the one in charge to comunicate with the Store to bring the values from the store // Field is a react component that works like a swiss army knive and can become many html input tags(input, textarea, cbox, radiobutton, etc)
import SurveyField from "./surveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "../surveys/formFields"

class SurveyForm extends Component {
    renderFields() {
        return FIELDS.map(({name, title}) => {
              return <Field key={name} title={title} type='text' name={name} component={SurveyField}/>
            });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">Cancel</Link>
                    <button type='submit' className="teal btn-flat right white-text">Submit</button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    /*Method that comes with redux form where i can set 
    up logic to see if info submitted in form is Valid, 
    if errors object is returned filled Redux Form will 
    assume that there is a field that needs to be fixed
    and will stop de submit action*/
    const errors = {}
        // if(!values.title) {
        //     errors.title = "You must provide a Title" //I must match the property pass to errors(title in this case) with the property name of the Field component
        // }
    
    errors.recipients = validateEmails(values.recipients || '')

    FIELDS.forEach(({name}) => {
        if(!values[name]) {
            errors[name] = "You must provide a value"
        } 
    });

    

    return errors
}

export default reduxForm({
    validate, //required to use function validate also is the short version of validate: validate
    form: 'surveyForm',
    destroyOnUnmount: false // to remain the values in the form and not get deleted once this component was unmounted.
})(SurveyForm);
