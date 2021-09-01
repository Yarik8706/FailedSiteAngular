const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Article = require('../models/Article')
const translate = require('../untils/translete')
const router = Router()

router.post(
    '/create-article',
    [
        check('title', 'Название слишком короткое или его вообще нет').isLength({min: 3}),
        check('text', 'Текста слишком мало').isLength({min: 30})
    ],
    async (req, res) => {
        try{

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json({
                    success: false,
                    message: 'Некорректные данные'
                })
            }

            const {author, title, text} = req.body

            const checkTitle = await Article.findOne({title})

            if (checkTitle)
            {
                return res.json({
                    success: false,
                    message: 'Такой article уже есть'
                })
            }

            const article = new Article({author, title, text: text, url: translate(title)})

            await article.save()

            return res.json({success: true, message: 'Статья создана, можете посмотреть ее в личном кабинете'})

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

             res.json({success: true, text: article.text, author: article.author, title: article.title, message: 'Статья найдена'})

         } catch (err) {
             res.json({success: false, message: 'Что то пошло не так, попробуйте снова'})
             console.log(err)
         }
     }
)
router.post(
    '/search-articles-by-title',
    async (req, res) => {
        try {

            const {title} = req.body
            console.log(title)
            console.log(translate(title))
            const articles = await Article.find({url: {$regex: translate(title)}})
            let necessaryInfo = [];
            for (let article of articles) {
                necessaryInfo.push({url: article.url, title: article.title})
            }

            if (!articles) {
                return res.json({success: false, message: 'Статьи не найдена'})
            }

            res.json({articles: articles, success: true, message: 'Найдено статьей: ' + articles.length})

        } catch (err) {
            res.json({success: false, message: 'Что то пошло не так, попробуйте снова'})
            console.log(err)
        }
    }
)

module.exports = router;