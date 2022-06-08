const { InlineKeyboard } = require('../buttons')
const messages = require('../messages.json')

module.exports.TextHandler = (bot, db) => {
  bot.on('text', async (ctx) => {
    const { session } = ctx
    const text = ctx.message.text


  })

}