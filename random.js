const cities = require('./src/cities.json')

module.exports.Random = (bot, db) => {
  const data = db.fetchAllData().Array

  const cityArray = cities.data.map(item => {
    const filter = data.filter(element => element.city === item.name)
    return filter
  })

  console.log(cityArray)

  cityArray.map(item => {
    if (item.length >= 2) {
      const user1 = item[getRandomInt(0, item.length - 1)]
      const user2 = item[getRandomInt(0, item.length - 1)]

      bot.telegram.sendMessage(user1.telegramId, `${user1.name, user1.socLink}`)
      bot.telegram.sendMessage(user2.telegramId, `${user2.name, user2.socLink}`)
    }
  })
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}