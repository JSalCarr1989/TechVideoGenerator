# Validación local

## Esqueleto ejecutable inicial

Fecha de ejecución: **2026-11-25**.

### Entorno observado

- Windows.
- Node.js `24.22.3` y npm `11.19.1`.
- SDK de .NET `10.0.404`.
- Playwright `1.65.1` con Chrome for Testing `159.0.8154.6`.

Para esta validación, los runtimes y el navegador se instalaron de forma aislada en `.tools/`, directorio excluido de Git. En una instalación normal basta con disponer de las versiones indicadas en `README.md` y ejecutar `npx playwright install chromium`.

### Resultado

Se ejecutó `npm run check` con el siguiente resultado:

| Comprobación | Resultado |
| --- | --- |
| Instalación limpia desde lockfile (`npm ci`) | Superada |
| Prueba de integración `GET /api/health` | 1 superada, 0 fallidas, 0 omitidas |
| Comprobación TypeScript del renderer | Superada |
| Bundle de la entrada Remotion | Generado correctamente en `src/renderer/dist/bundle` |
| Comprobación TypeScript y build de Vite | Superados |
| Smoke de navegador en desarrollo, Vite → proxy → API | 1 superada |
| Smoke de navegador en hosting integrado | 1 superada |

Los smokes comprobaron la página inicial, la respuesta JSON de `/api/health`, la dirección loopback y el montaje visible de la composición compartida en Remotion Player. No se observaron errores de página ni se generó ningún archivo MP4.

### Avisos no bloqueantes

- Vite informa que el chunk principal supera 500 kB tras minificación. Es un aviso de tamaño propio de esta integración inicial con Player; no se añadió división de código fuera del alcance del esqueleto.
- Remotion muestra su aviso sobre licencias. No se añadió `acknowledgeRemotionLicense` automáticamente; cada usuario debe revisar las condiciones aplicables antes de confirmarlo.
- El navegador de Playwright es un requisito adicional de las pruebas. Si no está instalado, la documentada orden `npx playwright install chromium` lo prepara.

### Perfiles y sockets de escucha

Se iniciaron los perfiles reales con los procesos de prueba y se comprobó:

| Perfil | `GET /` | `GET /api/health` |
| --- | --- | --- |
| Desarrollo mediante Vite en `127.0.0.1:5173` | 200 | 200 |
| Integrado mediante ASP.NET Core en `127.0.0.1:5081` | 200 | 200 |

`Get-NetTCPConnection` mostró los puertos `5080`, `5081` y `5173` escuchando exclusivamente en `127.0.0.1`. No se detectó ningún listener en `0.0.0.0` ni en otras interfaces. Los procesos creados para esta comprobación se detuvieron al finalizar.
