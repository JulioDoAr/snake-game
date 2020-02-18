const { app, BrowserWindow } = require('electron')

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 450,
    height: 480,
    webPreferences: {
      nodeIntegration: true
    },
    
  })
  win.loadFile(__dirname + '/resources/index.html');
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
//   var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'https://www.cornify.com/js/cornify.js';
// document.head.appendChild(script);
// setInterval("cornify_add()", 5000);