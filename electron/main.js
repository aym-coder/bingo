const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const isDev = !app.isPackaged

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 900,
        minHeight: 650,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        titleBarStyle: 'hiddenInset',
        backgroundColor: '#0f0b2e',
        fullscreen: true,
        show: false,
    })

    if (isDev) {
        win.loadURL('http://localhost:5173')
        win.webContents.openDevTools()
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'))
    }

    win.once('ready-to-show', () => {
        win.show()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

ipcMain.on('quit-app', () => {
    app.quit()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
