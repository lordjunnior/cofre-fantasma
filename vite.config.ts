import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
export default defineConfig({ plugins:[react(),tailwindcss()], resolve:{alias:{'@':path.resolve(__dirname,'src'),'@tanstack/react-router':path.resolve(__dirname,'src/compat/router.tsx'),'@tanstack/react-start/server':path.resolve(__dirname,'src/compat/start.ts'),'@tanstack/react-start':path.resolve(__dirname,'src/compat/start.ts')}} });
