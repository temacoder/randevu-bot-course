const { InlineKeyboard } = require('../buttons')
const messages = require('../messages.json')

module.exports.TextHandler = (bot, db) => {
  bot.on('text', async (ctx) => {
    const { session } = ctx
    const text = ctx.message.text

    if (session.step === 'city') {
      await ctx.telegram.sendMessage(ctx.chat.id, messages.city, { reply_markup: InlineKeyboard.cities(), parse_mode: 'HTML' })
      session.step = 'socLink'
      session.name = text
    } else if (session.step === 'job') {
      await ctx.reply(messages.job)
      session.step = 'hobby'
      session.socLink = text
    } else if (session.step === 'hobby') {
      await ctx.reply(messages.hobby)
      session.step = 'dateOfBirth'
      session.job = text
    } else if (session.step === 'dateOfBirth') {
      await ctx.reply(messages.dateOfBirth)
      session.step = 'end'
      session.hobby = text
    } else if (session.step === 'end') {
      await ctx.reply(messages.end)
      session.dateOfBirth = text
      const userData = {
        telegramId: ctx.chat.id,
        name: session.name,
        city: session.city,
        socLink: session.socLink,
        job: session.job,
        hobby: session.hobby,
        dateOfBirth: session.dateOfBirth
      }

      // db.set('Array', [ userData ])
      db.push('Array', userData)
    }

  })

}