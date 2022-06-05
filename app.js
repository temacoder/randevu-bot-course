const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const { Telegraf } = require('telegraf')
const LocalSession = require('telegraf-session-local')
const Server = require('./src/server/server')

const { Database } = require('sileco.db')
const db = new Database()

const { CommandHandler } = require('./src/handlers/commandHandler')
const { CallbackHandler } = require('./src/handlers/callbackHandler')
const { TextHandler } = require('./src/handlers/textHandler')
const { Random } = require('./random')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use((new LocalSession({ database: 'session.json' })).middleware())
Server.configure(bot)

CommandHandler(bot, db)
CallbackHandler(bot, db)
TextHandler(bot, db)
Random(bot, db)
setTimeout(() => {
  Random(bot, db)
}, 1000 * 60 * 60 * 24)