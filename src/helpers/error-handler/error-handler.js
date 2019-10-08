import TelegramBot from 'node-telegram-bot-api'

const telegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: false,
})

const errorHandler = ({ name, message }) => {
  const recipientId = 109470339
  const errorMessage = `<b>Sheeva: ${name}</b>\n\n${message}`
  return telegramBot.sendMessage(recipientId, errorMessage, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  })
}

export default errorHandler
