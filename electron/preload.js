const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    platform: process.platform,
    quitApp: () => ipcRenderer.send('quit-app'),
})
