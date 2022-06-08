const Telegraf = require('telegraf')
const { Markup } = Telegraf

const cities = require('./cities.json')

module.exports.InlineKeyboard = {
  start: () => {
    return Markup.inlineKeyboard([
      [ Markup.button.callback('Поехали 🚀', 'start') ]
    ])
  },
  cities: () => {
    return JSON.stringify({
      inline_keyboard: createCitiesButtons()
    })
  }
}

const createCitiesButtons = () => {
  return cities.data.map(item => [{ text: item.name, callback_data: `city-${item.code}` }])
}