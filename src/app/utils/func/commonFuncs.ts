export const getDocumentWidth = () => document.body.clientWidth

export const getElementWidth = (id: string) => {
  return new Promise<number>((resolve, reject) => {
    const el = document.getElementById(id)
    if (el) resolve(el.clientWidth)
    else reject(0)
  })
}

export const getGridConfig = (fullWidth: number) => {
  const elWidth = (fullWidth / 200 > 3) ? 200 : 100
  if (fullWidth >= 1600) return {
    gap: `${(fullWidth - 1400) / 6}px`,
    elWidth: `${elWidth}px`
  }
  if ((fullWidth % elWidth) === 0) fullWidth -= 1
  let numberOfEls = Math.floor(fullWidth / elWidth) > 7 ? 7 : Math.floor(fullWidth / elWidth)
  return {
    gap: `${(fullWidth % elWidth) / (numberOfEls - 1)}px`,
    elWidth: `${elWidth}px`,
  }
}
