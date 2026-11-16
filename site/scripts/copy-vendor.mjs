// Copia las librerías de navegador (UMD/CSS/fuentes) a assets/vendor para que
// el sitio no dependa de CDNs externos.
import { cpSync, mkdirSync } from "node:fs";

const files = [
  ["node_modules/echarts/dist/echarts.min.js", "assets/vendor/echarts/echarts.min.js"],
  ["node_modules/echarts-gl/dist/echarts-gl.min.js", "assets/vendor/echarts/echarts-gl.min.js"],
  ["node_modules/bootstrap-icons/font/bootstrap-icons.min.css", "assets/vendor/bootstrap-icons/bootstrap-icons.min.css"],
  ["node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2", "assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff2"],
  ["node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff", "assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff"],
];
for (const [src, dst] of files) {
  mkdirSync(dst.slice(0, dst.lastIndexOf("/")), { recursive: true });
  cpSync(src, dst);
}
console.log(`vendor: ${files.length} archivos copiados`);
