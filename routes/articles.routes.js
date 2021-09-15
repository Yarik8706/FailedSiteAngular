const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const { update } = require('../models/Article')
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

            const article = new Article(
                {author, 
                authorEmail: email, 
                title, 
                text, 
                url: translate(title), 
                type, 
                rating:{status: 0, whoEdit:[]}})

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

            const {url, id} = req.body

            const article = await Article.findOne({url})

            if(!article) {
               return res.json({success: false, message: 'Статья не найдена'})
            }

            try{
                let status = article.rating.whoEdit[article.rating.whoEdit.findIndex(el => el.id === id)].isDecreased
                // console.log(status)
                return res.json({
                    success: true,
                    text: article.text,
                    author: article.author,
                    title: article.title,
                    message: 'Статья найдена, на этот раз вам повезло',
                    email: article.authorEmail,
                    url: article.url,
                    rating: article.rating,
                    userStatus: status
               })
            } catch{
                return res.json({
                    success: true,
                    text: article.text,
                    author: article.author,
                    title: article.title,
                    message: 'Статья найдена, на этот раз вам повезло',
                    email: article.authorEmail,
                    url: article.url,
                    rating: article.rating
               })
            }
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
            
<<<<<<< HEAD
            const {text, title, id, commit} = req.body

            await Article.updateOne({title}, {
                $set: {text},
                $push: {'whoEdit': {id: id, commit: commit}}
            })
=======
            const {text, title} = req.body

            await Article.updateOne({title}, {$set: {text}})
>>>>>>> parent of 0eac406 (добавление истории изменений)

            res.json({message: "Статья успешно изменена", success: true})
        } catch (error) {
            res.json({message: 'Что то пошло не так, лучше не попробуйте снова' })
            console.log(err)

        }
    }
)

router.post(
    "/edit-article-status",
    async (req, res) => {
        try{
            
            const {status, url, id} = req.body
            console.log(req.body, " - body edit")
            
            let article = await Article.findOne({url})
            try{
                let pastGrade = article.rating.whoEdit[article.rating.whoEdit.findIndex(el => el.id == id)].isDecreased
                console.log(pastGrade)
                if(pastGrade == status){
                    return res.json({success: true})
                }
                await Article.updateOne({url}, { $pull: {"rating.whoEdit": {id: id, isDecreased: pastGrade}}})
                await Article.updateOne({url}, { $push: {"rating.whoEdit": {id, isDecreased: status}}})
                await Article.updateOne({url}, { $inc: {"rating.status": pastGrade ? -1 : 1}})

                return res.json({success: true})
            } catch{
                await Article.updateOne({url}, { $push: {"rating.whoEdit": {id, isDecreased: status}}})
                await Article.updateOne({url}, { $inc: {"rating.status": status ? 1 : -1}})
    
                return res.json({success: true, article})
            }
        } catch (error) {
            res.json({message: 'Что то пошло не так, лучше не попробуйте снова', success: false})
            console.log(error)

<<<<<<< HEAD
router.post(
    "/article-editing-history",
    async (req, res) => {
        try{
            
            const {title} = req.body
            
            const article = await Article.findOne({title})
            
            let users = [];

            for(let user of article.whoEdit){
                let userInfo = await User.findOne({id: user.id})
                users.push({name: userInfo.name, id: user.id, date: user.date, commit: user.commit})
            }

            return res.json({success: true, whoEdit: users, date: article.date})
        } catch (error) {
            res.json({message: 'Что то пошло не так, лучше не попробуйте снова', success: false})
            console.log(error)
=======
>>>>>>> parent of 0eac406 (добавление истории изменений)
        }
    }
)

module.exports = router;