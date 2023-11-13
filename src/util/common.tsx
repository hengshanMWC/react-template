import { NULL_VALUE } from '@/constant'

export function wait(time?: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export function blobDownload(blob: Blob, fileName: string) {
  const objectURL = window.URL.createObjectURL(blob)
  const downloadLink = document.createElement('a')
  downloadLink.href = objectURL
  downloadLink.download = fileName
  downloadLink.click()
  window.URL.revokeObjectURL(downloadLink.href)
}

export function renderColumn(value: any) {
  return <span>{isUselessValue(value) ? NULL_VALUE : value}</span>
}

export function removeUndefinedValues<T extends Record<string, any>>(obj: T): T {
  const entries = Object.entries(obj).filter(([key, value]) => value !== undefined)
  return Object.fromEntries(entries) as T
}

export function isUselessValue(value: any) {
  return [undefined, null, ''].includes(value)
}
