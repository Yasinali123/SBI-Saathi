import api from './axios'

// Chat
export const chatAPI = {
  sendMessage: (message: string, language?: string, session_id?: string) =>
    api.post('/api/chat', { message, language, session_id }),
}

// Fraud
export const fraudAPI = {
  analyze: (content: string, content_type: string) =>
    api.post('/api/fraud-check', { content, content_type }),
}

// Document
export const documentAPI = {
  upload: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/api/document-explain', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
