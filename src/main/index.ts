import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import * as dotenv from 'dotenv';
import path from 'path';
import { openDatabaseConnection, closeDatabaseConnection } from './database/connection';
import { createLlmClient } from './services/llm';
import setupChatApis from './llm-apis';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  try {
    await openDatabaseConnection();

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    createLlmClient();

    // IPC test
    ipcMain.on('ping', async () => {
      console.log('pong');
    });


    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  } catch (error) {
    console.error('Error opening database:', error);
    app.exit(1);
  }

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

let isQuitting = false;

app.on('will-quit', async (event) => {
  // Prevent multiple quit attempts
  if (isQuitting) return;
  event.preventDefault();
  isQuitting = true;

  try {
    await closeDatabaseConnection();
    console.log('Database closed, now quitting app');
    app.quit();
  } catch (error) {
    console.error('Error closing database:', error);
    // Force quit event if there was an error
    app.exit(1);
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
setupChatApis(ipcMain);