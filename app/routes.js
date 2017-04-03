module.exports = function(app,passport){

    app.get('/',function(req,res){
        res.render('index.ejs');
    });

    app.get('/login',function(req,res){
        res.render('login.ejs',{message: req.flash('loginMessage')});
    });

    app.post('/login',passport.authenticate('local-login',{
        successRedirect: '/registration',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/registration',function(req,res){
        if(req.user.local.entity === 'Admin')
            res.render('registration.ejs',{message: req.flash('signupMessage')});
        else res.render('invalidEntity.ejs');
    });

    app.post('/registration',passport.authenticate('local-registration',{
        successRedirect: '/profile',
        failureRedirect: '/registration',
        failureFlash: true
    }));

    app.get('/profile',function(req,res,done){
        res.render('profile.ejs',{user: req.user});
    });

    app.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req,res,next){
        if(req.isAuthenticated())
        return next();

        res.redirect('/');
    }

}