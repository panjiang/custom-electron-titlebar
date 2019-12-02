'use strict';
exports.__esModule = true;
var electron_1 = require('electron');
var path = require('path');
var url = require('url');
var mainWindow = null;
function createWindow() {
  mainWindow = new electron_1.BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(url.format(path.join(__dirname, 'index.html')));
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.once('ready-to-show', function() {
    return mainWindow.show();
  });
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    electron_1.app.quit();
  }
});
electron_1.app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
var template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteAndMatchStyle' },
      { role: 'delete' },
      { role: 'selectAll' },
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      {
        role: 'togglefullscreen',
        enabled: false,
      },
    ],
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: function() {
          require('electron').shell.openExternal('https://electronjs.org');
        },
      },
    ],
  },
];
if (process.platform === 'darwin') {
  template.unshift({
    label: electron_1.app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  });
  // Window menu
  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' },
  ];
}
electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
