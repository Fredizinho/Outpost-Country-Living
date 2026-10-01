/**
 * OUTPOST: COUNTRY LIVING — Native Desktop Main Process (main.js)
 *
 * Boots the compiled full-stack Express + Meteorological/Gemini server (dist/server.cjs)
 * or connects to the local dev server, then launches a native desktop window
 * for Windows (.exe/.msi), macOS (.dmg/.app), and Linux (.AppImage/.deb).
 */

import { app, BrowserWindow, Menu, shell, nativeTheme } from 'electron';
import path from 'path';
import http from 'http';
import { fork } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const APP_URL = `http://127.0.0.1:${PORT}`;
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

/** @type {BrowserWindow | null} */
let mainWindow = null;

/** @type {import('child_process').ChildProcess | null} */
let serverProcess = null;

/**
 * Polls the local server `/api/health` endpoint until it responds with HTTP 200.
 * @param {string} url
 * @param {number} timeoutMs
 * @returns {Promise<boolean>}
 */
function waitForServerReady(url, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      const req = http.get(`${url}/api/health`, (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          retry();
        }
      });
      req.on('error', retry);
      req.setTimeout(1500, () => {
        req.destroy();
        retry();
      });
    };

    const retry = () => {
      if (Date.now() - start >= timeoutMs) {
        resolve(false);
      } else {
        setTimeout(check, 250);
      }
    };

    check();
  });
}

/**
 * Starts the compiled Express backend (`dist/server.cjs`) if not already listening.
 */
async function ensureBackendServer() {
  const alreadyRunning = await waitForServerReady(APP_URL, 1200);
  if (alreadyRunning) {
    return;
  }

  const serverScriptPath = path.join(__dirname, 'dist', 'server.cjs');
  serverProcess = fork(serverScriptPath, [], {
    cwd: __dirname,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(PORT),
    },
    stdio: 'pipe',
  });

  serverProcess.stdout?.on('data', (chunk) => {
    console.log(`[Outpost Server]: ${chunk.toString().trim()}`);
  });

  serverProcess.stderr?.on('data', (chunk) => {
    console.error(`[Outpost Server Error]: ${chunk.toString().trim()}`);
  });

  await waitForServerReady(APP_URL, 15000);
}

/**
 * Navigates the main window smoothly via React Router IPC without full page reload.
 * @param {string} routePath
 */
function navigateToRoute(routePath) {
  if (!mainWindow) return;
  mainWindow.webContents.send('outpost:navigate', routePath);
}

/**
 * Builds the native Desktop Application Menu for Windows, macOS, and Linux.
 */
function buildNativeMenu() {
  const isMac = process.platform === 'darwin';

  /** @type {import('electron').MenuItemConstructorOptions[]} */
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    {
      label: 'Sanctuary',
      submenu: [
        {
          label: 'Home — Outpost Overview',
          accelerator: 'CmdOrCtrl+1',
          click: () => navigateToRoute('/'),
        },
        {
          label: 'Where — 28 Malawi Districts & Land Law',
          accelerator: 'CmdOrCtrl+2',
          click: () => navigateToRoute('/where'),
        },
        {
          label: 'GPS Scout Map — Hydrogeology & Contours',
          accelerator: 'CmdOrCtrl+M',
          click: () => navigateToRoute('/scout-map'),
        },
        {
          label: 'What — Crops, Soil Swatches & 75cm Ridge Planner',
          accelerator: 'CmdOrCtrl+3',
          click: () => navigateToRoute('/what'),
        },
        {
          label: 'How — Engineering Diagrams & Homestead Skills',
          accelerator: 'CmdOrCtrl+4',
          click: () => navigateToRoute('/how'),
        },
        {
          label: 'Calculators & Off-Grid Sizing Tools',
          accelerator: 'CmdOrCtrl+5',
          click: () => navigateToRoute('/calculators'),
        },
        { type: 'separator' },
        {
          label: 'Print / Save PDF Field Sheet',
          accelerator: 'CmdOrCtrl+P',
          click: () => mainWindow?.webContents.print({ printBackground: false }),
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
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
        { role: 'togglefullscreen' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

/**
 * Creates the primary native desktop window.
 */
async function createMainWindow() {
  await ensureBackendServer();

  nativeTheme.themeSource = 'system';

  mainWindow = new BrowserWindow({
    title: 'OUTPOST: COUNTRY LIVING — Malawi Sanctuary Blueprint',
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 680,
    backgroundColor: '#0A140E',
    show: false,
    autoHideMenuBar: false,
    icon: path.join(__dirname, 'public', 'pwa-512x512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true,
    },
  });

  buildNativeMenu();

  // Show window smoothly once first paint is ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    mainWindow?.focus();
  });

  // Open external links (e.g., FAO, DCCMS, Open-Meteo, Google Maps) in OS default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://127.0.0.1') || url.startsWith('http://localhost')) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  const indexPath = path.join(__dirname, 'dist', 'index.html');
  try {
    await mainWindow.loadURL(APP_URL);
  } catch {
    // Offline static file fallback if local loopback server is unavailable
    await mainWindow.loadFile(indexPath);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Single-instance lock so opening a second shortcut focuses the existing window
const gotSingleInstanceLock = app.requestSingleInstanceLock();
if (!gotSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(createMainWindow);
}

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
