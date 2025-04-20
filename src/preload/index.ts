import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  llm: {
    getModels: () => {
      return electronAPI.ipcRenderer.invoke('llm:get-models')
    },
    getModel: () => {
      return electronAPI.ipcRenderer.invoke('llm:get-model')
    },
    setModel: (model) => {
      return electronAPI.ipcRenderer.invoke('llm:set-model', model)
    },
    createCompletion: (prompt) => {
      return electronAPI.ipcRenderer.invoke('llm:create-completion', prompt)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
