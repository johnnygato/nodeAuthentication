module.exports = function(app,passport){

    app.get('/',function(req,res){
        res.render('index.ejs');
    });

    app.get('/login',function(req,res){
        res.render('login.ejs',{message: req.flash('loginMessage')});
    });

    app.post('/login',passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup',function(req,res){
        res.render('signup.ejs',{message: req.flash('signupMessage')});
    });

    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile',function(req,res,done){
        if(req.user.local.entity === 'Bombeiro')
            res.render('profile.ejs',{user: req.user});
        else return done(null, false,req.flash('loginMessage','Oops! Wrong password'));
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