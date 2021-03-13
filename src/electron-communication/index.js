const {ipcMain} = require('electron');

ipcMain.on('process-channel', (event, authors ) => {
  event.reply('process-channel',(authors))
}) 
