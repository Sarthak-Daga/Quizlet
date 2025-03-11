import { app, BrowserWindow } from "electron";

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        // fullscreen: true,
        // webPreferences: {
        //     nodeIntegration: true,
        // },
        width: 800,
        height: 600
    });

    mainWindow.setMenu(null);
    mainWindow
        .loadURL("http://localhost:3001")
        .catch((err) => console.error("Failed to load URL:", err));

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});
