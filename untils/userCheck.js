const Article = require('../models/Article')
const bcrypt = require('bcryptjs')

const check = (user, res) => {
    
    const checkUser = await Article.findOne({email: user.email})
    if (!checkUser) {
        return res.json({
            success: false,
            message: 'Некорректные данные'
        })
    }

    const isMatch = await bcrypt.compare(checkUser.password, user.password);
    if(!isMatch) {

    }
    return null;
}
module.exports = check;