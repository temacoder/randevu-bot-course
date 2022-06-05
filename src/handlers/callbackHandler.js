const { InlineKeyboard } = require('../buttons')
const messages = require('../messages.json')
const cities = require('../cities.json')

module.exports.CallbackHandler = (bot, db) => {
  bot.on('callback_query', async (ctx) => {
    const { callbackQuery, session } = ctx

    if (callbackQuery.data  === 'back') {
      await ctx.editMessageReplyMarkup()
      await ctx.reply(messages.start, InlineKeyboard.start())
    }

    if (callbackQuery.data  === 'start') {
      await ctx.editMessageReplyMarkup()
      await ctx.reply(messages.fio)
      session.step = 'city'
    }

    if (callbackQuery.data.startsWith('city-')) {
      const array = callbackQuery.data.split('-')

      await ctx.editMessageReplyMarkup()
      const city = cities.data.filter(element => element.code === array[1])
      session.city = city[0].name
      await ctx.replyWithHTML(`👉 Твой город: <b>${city[0].name}</b> 👍`)
      await ctx.reply(messages.socLink)
      session.step = 'job'
    }

  })
}