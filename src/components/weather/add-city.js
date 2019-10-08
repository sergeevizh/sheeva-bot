import {
  concat,
  converge,
  head,
  pick,
  pipe,
  replace,
  tail,
  toLower,
  toUpper,
  trim,
} from 'ramda'

import getLocation from './get-location'

const addCity = async ctx => {
  const capitalize = pipe(
    head,
    toUpper,
  )
  const lowercaseTail = pipe(
    tail,
    toLower,
  )
  const toTitle = converge(concat, [capitalize, lowercaseTail])
  const city = toTitle(
    trim(replace(/шива добавить город/i, '', ctx.message.text)),
  )
  const { display_name: fullCityName, ...data } = await getLocation(city)
  const cityData = pick(['lat', 'lon'], data)
  console.log('cityData', cityData)
  ctx.reply(`Добавлен город: ${fullCityName}`)
}

export default addCity
