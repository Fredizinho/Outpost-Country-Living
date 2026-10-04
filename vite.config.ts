import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';
              if (id.includes('lucide-react') || id.includes('motion')) return 'vendor-ui';
              if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
                return 'vendor-react';
              }
            }
            if (
              id.includes('src/data/malawiGeoData') ||
              id.includes('src/data/scoutGeoJSON') ||
              id.includes('src/data/malawiContourData') ||
              id.includes('src/data/malawiCustomaryBoundaries') ||
              id.includes('src/data/malawiVectorBasemapData')
            ) {
              return 'data-gis-malawi';
            }
            if (
              id.includes('src/data/skillsAndSeasons') ||
              id.includes('src/data/skillsTechnicalProtocols') ||
              id.includes('src/data/outpostFourPillarsData') ||
              id.includes('src/data/actionableAlmanacData')
            ) {
              return 'data-manuals';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
