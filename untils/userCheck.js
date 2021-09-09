const User = require('../models/Article')
const GlobalPassword = require('../models/Password')
const bcrypt = require('bcryptjs')
const Password = require('../models/Password')

const check = (user, password) => {
    
    const checkUser = await User.findOne({email: user.email})
    if (!checkUser) {
        return res.json({
            success: false,
            message: 'Ошибка'
        })
    }

    const checkPassword = await bcrypt.compare(checkUser.password, user.password);
    if(!checkPassword) {
        return res.json({
            success: false,
            message: 'Ошибка'
        })
    }

    const globalPassword = await Password.findOne({id: password.id})
    if(!globalPassword){
        return res.json({
            success: false,
            message: 'Ошибка'
        })
    }
    if(globalPassword.password == password.password){
        return true
    }

    return null;
}
module.exports = check;