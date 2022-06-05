const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const Server = {
    configure: function (bot) {
        this.bot = bot

        this.app = express()
        this.app.use('/', express.static(path.join(`${__dirname}/views`)))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.set('views', path.join(__dirname, './views'))
        this.app.set('view engine', 'ejs')

        this.app.get('/', this.homeController)
        this.app.use(this.bot.webhookCallback('/'))


        const port = process.env.PORT
        this.app.listen(port, () => {
          console.log(`Express server is listening on ${port}`)
        })

        this.bot.telegram.setWebhook(process.env.WEBHOOK)

        this.bot.telegram.getMe().then((res) => console.log(res))
        console.log(' [x] Bot running locally, mode: ', process.env.NODE_ENV)
        console.log(' [x] Connect to PORT: ', process.env.PORT)

        process.once('SIGINT', () => bot.stop('SIGINT'))
        process.once('SIGTERM', () => bot.stop('SIGTERM'))
    },

    homeController: function (request, response) {
        console.log('Called home controller')
        response.render('index')
    }
}

module.exports = Server