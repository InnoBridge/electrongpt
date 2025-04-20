import { ElectronAPI } from '@electron-toolkit/preload'

interface API {
  llm: {
    getModels: () => Promise<string[]>
    getModel: () => string | null
    setModel: (model: string) => Promise<void>
    createCompletion: (prompt: string) => Promise<{ role: string; content: string }>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
