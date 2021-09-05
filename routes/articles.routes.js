const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Article = require('../models/Article')
const translate = require('../untils/translete')
const router = Router()

router.post(
    '/create-article',
    [
        check('title', 'Название слишком короткое или его вообще нет').isLength({min: 3}),
        check('text', 'Текста слишком мало или его вообще нет').isLength({min: 30})
    ],
    async (req, res) => {
        try{

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json({
                    messages: errors.array(),
                    success: false,
                    message: 'Некорректные данные'
                })
            }

            const {author, email, title, text, type} = req.body

            const checkTitle = await Article.findOne({title})

            if (checkTitle)
            {
                return res.json({
                    success: false,
                    message: 'Такой статья уже есть'
                })
            }

            const article = new Article({author, authorEmail: email, title, text, url: translate(title), type})

            await article.save()

            return res.json({success: true, message: 'Статья создана, можете посмотреть ее в личном кабинете'})

        } catch (err) {
            res.json({success: false, message: 'Что то пошло не так, попробуйте снова'})
            console.log(err)

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

             console.log(article.authorEmail)

             res.json({
                 success: true,
                 text: article.text,
                 author: article.author,
                 title: article.title,
                 message: 'Статья найдена, на этот раз вам повезло',
                 email: article.authorEmail
            })
         } catch (err) {
             res.json({success: false, message: 'Что то пошло не так, на этот раз мне не повезло'})
             console.log(err)
         }
     }
)

router.post(
    '/search-articles-by-title',
    async (req, res) => {
        try {

            const {title} = req.body

            const articles = await Article.find({title: {$regex: title}})

            let necessaryInfo = [];

            for (let article of articles) {
                necessaryInfo.push({url: article.url, title: article.title})
            }

            if (!articles) {
                return res.json({success: false, message: 'Статьи не найдены'})
            }

            res.json({articles: articles, success: true, message: 'Найдено статьей: ' + articles.length})

        } catch (err) {
            res.json({success: false, message: 'Что то пошло не так, попробуйте снова'})
            console.log(err)
        }
    }
)

router.post(
    '/search-articles-by-author',
    async (req, res) => {
        try {

            const {email} = req.body
            console.log("Поиск пошел. Данные о пользователе - ", email)

            const articles = await Article.find({authorEmail: email})

            let necessaryInfo = [];

            for (let article of articles) {
                necessaryInfo.push({url: article.url, title: article.title})
            }

            if (!articles) {
                return res.json({success: false, message: 'Статьи не найдены'})
            }

            res.json({articles: articles, success: true, message: 'Найдено статьей: ' + articles.length})

        } catch (err) {
            res.json({success: false, message: 'Что то пошло не так, попробуйте снова'})
            console.log(err)
        }
    }
)

router.post(
    "/update-article-data",
    async (req, res) => {
        try{
            
            const {text, title} = req.body

            await Article.updateOne({title}, {$set: {text}})

            res.json({message: "Статья успешно изменена", success: true})
        } catch (error) {
            res.json({message: 'Что то пошло не так, лучше не попробуйте снова' })
            console.log(err)

        }
    }
)

module.exports = router;