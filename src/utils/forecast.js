const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/a0965e3b67c330216004c2fdacaab92c/${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback(body.error)
        } else {
            const { summary, temperatureHigh, temperatureLow } = body.daily.data[0]
            const { temperature, precipProbability } = body.currently
            callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. Today's temperature is expected to reach a high of ${temperatureHigh} degrees with a low of ${temperatureLow} degrees.`)
        }
    })
}

module.exports = forecast