import currencyapi from '@everapi/currencyapi-js'
import dotenv from 'dotenv';
dotenv.config()

const client = new currencyapi(process.env.CURRENCY_API_KEY)

export const checkStatus = async () => {
  return await client.status()
}

export const getCurrentCurrency = async (baseCurrency) => {
  return await client.latest({
    base_currency: baseCurrency,
    currencies: 'RUB'
})
}
