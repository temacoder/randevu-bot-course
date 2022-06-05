const { InlineKeyboard } = require('../buttons')
const messages = require('../messages.json')

module.exports.CommandHandler = (bot) => {
  bot.start(async (ctx) => {
    console.log(ctx.chat.id)
    await ctx.replyWithHTML(messages.start, InlineKeyboard.start())
  })

}