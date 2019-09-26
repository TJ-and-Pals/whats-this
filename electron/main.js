//https://stackoverflow.com/questions/38204774/serving-static-files-in-electron-react-app
//https://stackoverflow.com/questions/37967513/exit-full-screen-when-esc-is-pressed-using-javascript-with-electron

const { app, BrowserWindow, protocol } = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron');
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600})

  mainWindow.setMenu(null);
  mainWindow.setFullScreen(true);

  mainWindow.loadURL(url.format({
    pathname: 'index.html',    /* Attention here: origin is path.join(__dirname, 'index.html') */
    protocol: 'file',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
      const url = request.url.substr(7)    /* all urls start with 'file://' */
      //console.log(request.url, " => ", url, ' => ', path.normalize(`${__dirname}/${url}`));
      callback({ path: path.normalize(`${__dirname}/${url}`) })
    }, (err) => {
      if (err) console.error('Failed to register protocol')
    }
  )

  electron.globalShortcut.register('Escape', function(){
    mainWindow.setFullScreen(false);
  });
  electron.globalShortcut.register('F11', function(){
    mainWindow.setFullScreen(true);
  });
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', function(){

  electron.globalShortcut.unregister('Escape');
  electron.globalShortcut.unregister('F11');

  electron.globalShortcut.unregisterAll();
});