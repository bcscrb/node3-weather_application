const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=15c02ff5b76a04699455975760eab494&query='+latitude+','+longitude
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
         callback('Unable to access Weatherstack.com',undefined)
        } else if (body.error ) {
            callback ('Unable to locate location provided',undefined)
        } else {
            const {weather_descriptions:description, temperature:temp, feelslike:feelslike, precip: precip} = body.current
          callback (undefined,description+' : Current Temp ' +temp+ ' but feels like '+feelslike + ', Change of rain is '+precip+ '%')
            // callback (undefined,{ s
            //      temp: response.body.current.temperature,
            //      precip: response.body.current.precip,
            //      feelsLike: response.body.feelsLike,
            //      description: response.body.current.weather_descriptions[0]
            // })
        }
    })
}

module.exports = forecast