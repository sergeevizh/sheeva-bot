import Forecast from 'forecast'
import { errorHandler } from '../../helpers'

const forecast = new Forecast({
  service: 'darksky',
  key: process.env.FORECAST_TOKEN,
  units: 'celcius',
  cache: true,
  ttl: {
    minutes: 27,
    seconds: 45,
  },
})

forecast.get([-33.8683, 151.2086], (error, weather) => {
  if (error) {
    errorHandler({
      name: 'Ошибка получения данных погоды',
      message: error,
    })
    return null
  }
  return weather
})
