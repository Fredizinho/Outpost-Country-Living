/**
 * OUTPOST: COUNTRY LIVING — Context-Isolated Desktop Preload Bridge (preload.cjs)
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('outpostDesktop', {
  isDesktopApp: true,
  platform: process.platform,
  arch: process.arch,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  onNavigate: (callback) => {
    if (typeof callback !== 'function') return () => {};
    const handler = (_event, routePath) => {
      if (typeof routePath === 'string') {
        callback(routePath);
      }
    };
    ipcRenderer.on('outpost:navigate', handler);
    return () => ipcRenderer.removeListener('outpost:navigate', handler);
  },
});
