const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Article = require('../models/Article')
const router = Router()

router.post(
    '/reg',
    [
        check('name', 'Слишком короткое имя').isLength({ min: 3}),
        check('email', 'Некорректная почта').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json({
                    messages: errors.array(),
                    success: false,
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {name, email, password} = req.body

            const checkName = await User.findOne({name})

            if (checkName)
            {
                return res.json({
                    success: false,
                    message: 'Такой пользователь уже есть'
                })
            }

            const checkEmail = await User.findOne({email})

            if (checkEmail) {
                return res.json({
                    success: false,
                    message: 'Такой пользователь уже есть'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({name, email, password: hashedPassword})

            await user.save()

            res.json({success: true, message: 'Пользователь создан'})
        } catch (error) {
            res.json({success: false, message: 'Что то пошло не так, попробуйте снова'})
        }
    }
)

router.post(
    '/auth',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json({
                    messages: errors.array(),
                    success: false,
                    message: 'Некорректные данные при входе в аккаунт'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.json({success: false, message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.json({success: false, message: 'Неверный пароль' })
            }
            const token = jwt.sign(
                { id: user.id },
                config.get('JwtSecret'),
                { expiresIn: '1h'}
                )
            res.json({token, user: user, success: true})
        } catch (error) {
            res.json({success: false, message: 'Что то пошло не так, попробуйте снова' })
        }
    }
)

router.post(
    "/update-user-data",
    async (req, res) => {
        try{
            
            const {name, email} = req.body

            const user = await User.findOne({email})

            if(user.name == name) {
                return res.json({message: 'Вы не изменили имя'})
            }

            await User.updateOne({email: this.email}, {$set: {name: this.name}})
            await Article.updateMany({author: user.name}, {$set: {author: name}})

            res.json({message: "Данные успешно изменены"})
        } catch (error) {
            res.json({message: 'Что то пошло не так, попробуйте снова' })
        }
    }
)

module.exports = router