import { api } from './api'

export interface ISendImageData {
  name: string
  imageUrl: string
}

export const ImageAPI = {
  sendImage(data: ISendImageData): Promise<any> {
    return api.post('/image', { image: data })
  },
  getImage(imageId: string): Promise<any> {
    return api.get(`/image/${imageId}`)
  },
}
