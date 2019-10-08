import addCity from './add-city'
import getWeather from './get-weather'
import removeCity from './remove-city'

export default [
  {
    name: /^добавить город/,
    func: addCity,
  },
  {
    name: /^погода$/,
    func: getWeather,
  },
  {
    name: /^удалить город/,
    func: removeCity,
  },
]
