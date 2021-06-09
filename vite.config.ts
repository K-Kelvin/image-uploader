import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "services": resolve(__dirname, "src/services"),
      "images": resolve(__dirname, "src/images"),
      "components": resolve(__dirname, "src/components"),
    }
  }
})
