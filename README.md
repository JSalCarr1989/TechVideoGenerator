# Tech Video Generator

Esqueleto ejecutable local para validar la separación entre React/Vite, ASP.NET Core y Remotion. Esta etapa abre una aplicación web local en el navegador; todavía no incluye editor, proyectos de usuario, renderizado MP4, IA ni instalador.

## Requisitos

- Windows y PowerShell.
- Node.js **24.22.3** con npm **11.19.1** (`.nvmrc` fija la versión de Node.js).
- SDK de .NET **10.0.404** (`global.json` exige esa versión).
- No se requieren GPU, credenciales ni servicios remotos para ejecutar el esqueleto.

Comprueba los runtimes desde la raíz del repositorio:

```powershell
node --version
npm --version
dotnet --version
```

Instala las dependencias reproducibles:

```powershell
npm ci
```

## Desarrollo local

Inicia la API en una terminal:

```powershell
npm run dev:api
```

Inicia Vite en otra terminal:

```powershell
npm run dev:web
```

Abre `http://127.0.0.1:5173`. La API escucha en `http://127.0.0.1:5080` y Vite reenvía `/api/*` sin configurar CORS. La interfaz consulta `GET /api/health`; si la API no está disponible, muestra un error y permite reintentar.

Los perfiles se encuentran en `src/api/Properties/launchSettings.json`. Para cambiar el puerto de Vite o el destino del proxy, copia `src/web/.env.example` como `src/web/.env.local` y ajusta `VITE_PORT` y `VITE_API_PROXY_TARGET`.

## Ejecución integrada

Compila el frontend y arranca el perfil integrado:

```powershell
npm run build:web
npm run start:integrated
```

Abre `http://127.0.0.1:5081`. ASP.NET Core sirve `src/web/dist` y `/api/health` desde el mismo origen. Las rutas SPA vuelven a `index.html`; las rutas `/api/*` desconocidas devuelven 404. Si falta el build, la ruta principal devuelve 503 con una indicación para compilarlo.

Opcionalmente, `WEB_DIST_PATH` permite indicar otra carpeta de salida de Vite antes de iniciar la API.

## Composición Remotion

La composición compartida está en `src/renderer/src`. La vista inicial la reutiliza mediante Remotion Player; el punto de entrada del bundle registra exactamente la misma composición.

```powershell
npm run bundle:renderer
```

El bundle se genera en `src/renderer/dist/bundle`. Esta comprobación no exporta vídeo ni inicia un servicio independiente. Las dependencias Remotion están alineadas en **4.0.547**; revisa sus [condiciones de licencia](https://www.remotion.dev/docs/license) antes de uso comercial.

Este cambio no acepta condiciones en nombre del usuario. Por ese motivo no se añadió automáticamente la propiedad `acknowledgeRemotionLicense`; Player puede mostrar el aviso de licencia en la consola hasta que se revise y se confirme conscientemente.

## Comprobaciones

Instala una vez el navegador de prueba:

```powershell
npx playwright install chromium
```

Ejecuta toda la validación local:

```powershell
npm run check
```

O usa el script de PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-local.ps1
```

El comando comprueba la API con `WebApplicationFactory`, compila Vite, genera el bundle Remotion y ejecuta el smoke de navegador en los modos desarrollo e integrado. Los resultados observados y cualquier limitación se registran en `docs/VALIDATION.md`.

Comandos individuales:

```powershell
npm run test:api
npm run build
npm run test:browser
```

## Diagnóstico

- **Puerto ocupado:** Vite usa `strictPort`; cambia `VITE_PORT` o cierra el proceso que ocupa 5173. Los puertos API se cambian en `launchSettings.json`.
- **API no disponible:** comprueba `http://127.0.0.1:5080/api/health` y vuelve a intentarlo desde la interfaz.
- **Build integrado ausente:** ejecuta `npm run build:web` antes de `npm run start:integrated`.
- **Navegador de Playwright ausente:** ejecuta `npx playwright install chromium`.
- **Listeners locales:** durante la ejecución, comprueba que las direcciones sean loopback:

```powershell
Get-NetTCPConnection -LocalPort 5080,5081,5173 -State Listen -ErrorAction SilentlyContinue |
    Select-Object LocalAddress, LocalPort, OwningProcess
```

No uses `0.0.0.0` para los perfiles locales.
