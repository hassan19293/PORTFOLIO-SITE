import { defineConfig } from 'vite';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

function copyOriginalExperience() {
  return {
    name: 'copy-original-experience',
    closeBundle() {
      copyFileSync(resolve(process.cwd(), 'orignal1.html'), resolve(process.cwd(), 'dist/orignal1.html'));
    }
  };
}

export default defineConfig({
  plugins: [react(), copyOriginalExperience()],
  server: { port: 5173, strictPort: true },
  build: { sourcemap: false }
});
