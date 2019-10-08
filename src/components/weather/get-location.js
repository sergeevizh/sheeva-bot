import fetch from 'node-fetch'
import { errorHandler } from '../../helpers'

const getLocation = async (q, limit = '1') => {
  const params = new URLSearchParams({
    q,
    limit,
    format: 'json',
  })
  const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`
  const payload = await fetch(url).then(response => response.json())
  if (!payload || !payload.length) {
    errorHandler({
      name: 'Ошибка добавления города',
      message: `Не удалось найти город ${q}. URL-запроса: ${url}`,
    })
  }
  return payload[0]
}

export default getLocation
