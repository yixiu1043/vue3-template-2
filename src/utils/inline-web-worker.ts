window.URL = window.URL || window.webkitURL

interface NewWorkerData {
  type: string
  data?: any
  id?: string | number
  [k: string]: any
}

export interface NewWorker extends Worker {
  onmessage: ((this: Worker, ev: MessageEvent<NewWorkerData>) => any) | null
  onmessageerror: ((this: Worker, ev: MessageEvent) => any) | null
  postMessage(message: NewWorkerData, transfer: Transferable[]): void
  postMessage(message: NewWorkerData, options?: StructuredSerializeOptions): void
}

export default function newWebWorker(source: Function) {
  const response: string = source.toString()
  // response = response.slice(response.indexOf('{') + 1, -1)

  let blob
  try {
    blob = new Blob([`(${response})()`], { type: 'application/javascript' })
  } catch (e) {
    //@ts-ignore
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder
    //@ts-ignore
    blob = new BlobBuilder()
    blob.append(response)
    blob = blob.getBlob()
  }
  return new Worker(URL.createObjectURL(blob)) as NewWorker
}
