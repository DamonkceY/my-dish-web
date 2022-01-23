export const getDocumentWidth = () => document.body.clientWidth


export const mapObjectToInterface = (data: Record<string, any>, keys: Array<string>) => {
  let tempData: Record<string, any> = {}
  keys.forEach((key) => {
    tempData[key] = data[key]
  })
  return tempData
}


export const generateUniqueId = () => {
  return `${Math.floor(Math.random() * 100)}_${Date.now()}`
}

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
