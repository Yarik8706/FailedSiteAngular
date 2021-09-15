const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Article = require('../models/Article')
const router = Router()

router.post(
    '/search-user-by-id',
    async (req, res) => {
        try {

            const {id} = req.body

            const user = await User.findOne({id})

            if(!user) {
               return res.json({success: false, message: 'Такого пользователя нет'})
            }

            res.json({
                success: true,
                name: user.name,
                date: user.date,
                aboutUser: user.aboutUser,
                status: user.status,
                message: 'Пользователь найден, на этот раз вам повезло',
                email: user.email
           })
        } catch (err) {
            res.json({success: false, message: 'Что то пошло не так, на этот раз мне не повезло'})
            console.log(err)
        }
    }
)

module.exports = router