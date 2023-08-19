import dotenv from 'dotenv';
dotenv.config()
import {Telegraf, Markup} from 'telegraf'
import {checkStatus, getCurrentCurrency} from './modules/currency/index.js'


const bot = new Telegraf(process.env.BOT_TOKEN)

// bot.use(Telegraf.log())

bot.start((ctx) => ctx.reply('Welcome'))

bot.hears('/status', async (ctx) => {
  const responce = await checkStatus()
  if (responce) {
    ctx.reply(`Текущий статус: \nКвота ${responce.quotas.month.total} запросов в мес \nИспользовано: ${responce.quotas.month.used}`)
  } else {
    ctx.reply('Нет ответа от модуля валют')
  }
})

bot.command("custom", async ctx => {
	return await ctx.reply(
		"Custom buttons keyboard",
		Markup.keyboard([
			["🔍 Статус API валют", "😎 Текущий курс"], // Row1 with 2 buttons
		])
			.oneTime()
			.resize(),
	);
});

bot.hears("🔍 Статус API валют", async (ctx) => {
  const responce = await checkStatus()
  if (responce) {
    ctx.reply(`Текущий статус: \nКвота ${responce.quotas.month.total} запросов в мес \nИспользовано: ${responce.quotas.month.used}\nОсталось запросов: ${responce.quotas.month.remaining}`)
  } else {
    ctx.reply('Нет ответа от модуля валют')
  }
})

bot.hears("😎 Текущий курс", async (ctx) => {
  ctx.reply('🕐Минутку, считаем...')
  const responceEUR = await getCurrentCurrency('EUR')
  const responceUSD = await getCurrentCurrency('USD')
  const responceCNY = await getCurrentCurrency('CNY')
  if (responceEUR && responceUSD && responceCNY) {
    ctx.reply(`Курсы валют на ${new Date(responceEUR.meta.last_updated_at).toLocaleDateString()}\n🔹Евро: ${responceEUR.data.RUB.value}\n🔹Доллар: ${responceUSD.data.RUB.value}\n🔹Юань: ${responceCNY.data.RUB.value}`)
  } else {
    ctx.reply('Нет ответа от модуля валют')
  }
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));