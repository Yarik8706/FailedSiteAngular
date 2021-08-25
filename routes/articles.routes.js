const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Article = require('../models/Article')
const translate = require('../untils/translete')
const router = Router()

router.post(
    '/create-article',
    [
        check('title', 'Название слишком короткое или его вообще нет').isLength({min: 5})
    ],
    async (req, res) => {
        try{
            console.log('Данные отправились на обработку')
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json({
                    success: false,
                    message: 'Некорректные данные'
                })
            }
            console.log('Данные берутся из переменной')
            const {author, title, text} = req.body

            const checkTitle = await Article.findOne({title})

            if (checkTitle)
            {
                return res.json({
                    success: false,
                    message: 'Такой article уже есть'
                })
            }
            console.log('Данные отправились на обработку')
            const article = new Article({author, title, text: text, url: translate(title)})
            console.log("Все хорошо 1")
            await article.save().then(() => {
                console.log("Все хорошо 2")
                return res.json({success: true, message: 'Статья создана, можете посмотреть ее в личном кабинете'})
            })
        } catch (err) {
            res.json({success: false, message: 'Что то пошло не так, попробуйте снова'})
        }
    }
)
router.post(
     '/search-article-by-url',
     async (req, res) => {
         try {

             const {url} = req.body

             const article = await Article.findOne({url})

             if(!article) {
                 return res.json({success: false, message: 'Статья не найдена'})
             }

             res.json({text: article.text, author: article.author, title: article.title, success: true, message: 'Статья найдена'})

         } catch (err) {
             res.json({success: false, message: 'Что то пошло не так, попробуйте снова'})
             console.log(err)
         }
     }
)

module.exports = router;