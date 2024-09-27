const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.showIndex = (req, res, next) => {
    res.render('index')
}

exports.showPageSignUp = (req, res, next) => {
    res.render('signUp')
}

exports.showMembersPage = (req, res) => {
    res.render('members')
}

exports.get404Page = (req, res, next) => {
    res.status(404).render('404')
}

exports.signup = async (req, res, next) =>{
    const {username, email, password} = req.body
    const hashedPassoword = await bcrypt.hash(password, 10)  
    const user = new User(username, email, hashedPassoword)
    try{
        await user.save()
        res.redirect('/')
    } catch (erro){
        console.log(erro)
        res.redirect('signup')
    }
}


exports.login = async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne(email, password)

    try {
        if(user){
            req.session.user = user
            res.redirect('/members') 
        }else{
            res.render('index')
        }

        
    } catch (error) {
        console.log(error)
        res.render('signup')
    }
}

exports.checkAuth = (req, res, next) => {
    
    if(req.session && req.session.user || req.isAuthenticated()){
        next()
    } else{
        res.redirect('/')
    }

}


exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
        } else{
            res.redirect('/')
        }
    })
}

