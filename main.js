"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var app = electron.app, BrowserWindow = electron.BrowserWindow;
var win;
app.on('ready', function () {
    win = new BrowserWindow({
        darkTheme: true,
        backgroundColor: "#0c0c0c",
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('index.html');
    win.on('ready-to-show', function () {
        win.show();
    });
});
