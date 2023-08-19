export const fixTimestamp = (tg_timestamp) => {
  return tg_timestamp * 1000
}

export const humanizeTimestamp = (timestamp, withTime) => {
  if (withTime) {
    return `${new Date(timestamp).toLocaleDateString()} ${new Date(timestamp).toLocaleTimeString()}`
  }
  return `${new Date(timestamp).toLocaleDateString()}`
}