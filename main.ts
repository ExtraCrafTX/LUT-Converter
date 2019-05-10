import electron = require('electron');
const {app, BrowserWindow} = electron;

let win: electron.BrowserWindow;

app.on('ready', ()=>{
    win = new BrowserWindow({
        darkTheme:true,
        backgroundColor:"#0c0c0c",
        show:false,
        webPreferences:{
            nodeIntegration:true
        }
    });
    
    win.loadFile('index.html');
    win.on('ready-to-show', ()=>{
        win.show();
    });
});