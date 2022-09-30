const { app, BrowserWindow, screen: electronScreen} = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require("electron-log")
const path = require('path');
const url = require('url');
let mainWindow;


// на маке перед названием приложения надо open прописать: open admn4.docx
log.transports.file.level = "info";
autoUpdater.logger = log;

async function createWindow() {
  let startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'),
    }
  });
  mainWindow.setMenuBarVisibility(null)
  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}


app
  .on("ready", createWindow)
  .whenReady()
  .then(() => console.log("ready"))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})