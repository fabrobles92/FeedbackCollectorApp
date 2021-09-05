const passport = require('passport');
// const express = require('express')
// const router = express.Router()

// router.get('/', passport.authenticate("google", {
//     scope: ['profile', 'email']
// })
// );

// router.get('/callback', passport.authenticate('google'));

// module.exports = router


module.exports = (app) => {
    app.get('/auth/google', passport.authenticate("google", {
        scope: ['profile', 'email']
    })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/me', (req, res)=> {
        res.send(req.user);
    })

    app.get('/api/logout', (req,res) =>{
        req.logout();
        res.send(req.user);
    })
}



