import VkBot from 'node-vk-bot-api'
import firebase from 'firebase'

import {
  T,
  cond,
  identity,
  indexBy,
  isNil,
  map,
  match,
  merge,
  mergeWith,
  not,
  partial,
  pipe,
  prop,
  reduce,
  replace,
  test,
  trim,
  useWith,
  values,
  when,
} from 'ramda'

import components from './components'

const bot = new VkBot(process.env.VK_TOKEN)

firebase.initializeApp({
  apiKey: process.env.FIREBASE_TOKEN,
  databaseURL: process.env.FIREBASE_URL,
})

bot.event('message_new', ctx => {
  const {
    message: { text },
  } = ctx
  const botNameRegex = /^шива/i
  const isSheevaMessage = test(botNameRegex)
  const handleMessage = when(isSheevaMessage, () => {
    const getCommand = pipe(
      replace(botNameRegex, ''),
      trim,
    )
    const checkCommand = pipe(
      useWith(match, [identity, getCommand]),
      prop('input'),
      isNil,
      not,
    )
    const caseCommand = ({ name, func }) => [
      partial(checkCommand, [name, text]),
      partial(func, [ctx]),
    ]
    const getCommands = pipe(
      map(indexBy(prop('name'))),
      reduce(mergeWith(merge), {}),
      values,
      map(caseCommand),
    )
    const switchCommand = cond([
      ...getCommands(components),
      [T, () => ctx.reply('Неизвестная команда')],
    ])
    switchCommand(text)
  })
  handleMessage(text)
})

bot.startPolling()
