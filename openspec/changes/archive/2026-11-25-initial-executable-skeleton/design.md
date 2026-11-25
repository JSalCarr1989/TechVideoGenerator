# Diseño: Esqueleto ejecutable inicial

## Contexto y restricciones

La arquitectura existente define tres partes —frontend, backend y renderer—, requiere operación local en Windows, datos bajo control del usuario y separación entre editor y render. También excluye microservicios e infraestructura innecesaria. Esta etapa solo valida el arranque y los límites entre partes; no define el modelo de escena ni un flujo de exportación.

## Estructura propuesta

```text
TechVideoGenerator/
├── docs/
├── openspec/
├── scripts/                 # utilidades locales/smoke test, solo si hacen falta
├── src/
│   ├── web/                 # React + TypeScript + Vite; cliente HTTP /api
│   ├── api/                 # ASP.NET Core; endpoint health y hosting local
│   └── renderer/            # composiciones compartidas y entrada Remotion
└── tests/
    └── integration/         # smoke de navegador y límites locales
```

La estructura coincide con la arquitectura documentada. Se recomienda un workspace npm pequeño para compartir la composición y alinear dependencias React/Remotion entre Player y renderer; la API .NET queda como proyecto separado. Evitar una biblioteca de dominio o un modelo de escenas anticipado en este cambio.

## Ejecución y comunicación

- **Desarrollo:** dos procesos locales, iniciados en terminales independientes: API con `dotnet watch` y Vite con el script npm del workspace web. Vite proxifica `/api` al perfil HTTP de ASP.NET Core. Usar direcciones explícitas de loopback y puertos configurables por perfil; no escuchar en todas las interfaces.
- **Ejecución integrada local:** compilar Vite y configurar ASP.NET Core para servir su salida estática y fallback SPA, conservando `/api/*` para endpoints. No se propone todavía instalador ni ejecución como servicio de Windows.
- **Frontend ↔ API:** HTTP JSON, rutas relativas `/api`; sin URL remota ni dependencia de CORS. Un endpoint `GET /api/health` sirve como contrato inicial observable.
- **React ↔ Player ↔ composición:** Remotion Player se integra directamente en React. El frontend importa la composición compartida desde `src/renderer` y la muestra en el navegador; el punto de entrada del bundle Remotion referencia exactamente la misma composición. La API no interviene en esta previsualización.
- **API ↔ renderizado:** no existe comunicación API→renderer en esta etapa. ASP.NET Core no inicia, controla ni se comunica con un proceso renderer, y no se implementa un daemon, microservicio, cola, protocolo IPC ni proceso de render persistente. El renderizado de vídeo queda fuera de este cambio; una propuesta posterior deberá decidir el lanzamiento controlado del proceso Node y el transporte de progreso/cancelación.

## Dependencias y versiones

- .NET 10 LTS es la recomendación para el backend. A fecha de consulta de la política oficial (noviembre de 2026), .NET 10 es LTS activo; .NET 11 es STS.
- Node.js 24 LTS es una línea conservadora compatible con el flujo Vite/Remotion esperado. Fijar el patch/runtime mediante documentación de requisitos y validar Windows en CI/local antes de cerrar.
- Usar versiones estables de React, TypeScript y Vite compatibles con la versión Remotion seleccionada.
- Alinear todas las dependencias `@remotion/*` a la misma versión exacta y guardar lockfile npm. No asumir que una versión futura concreta es compatible sin ejecutar la validación.
- El render de producción requiere el pipeline Node de Remotion; la documentación describe `@remotion/renderer` con `renderMedia()` y bundle local, pero eso se reserva para una fase de renderizado.

## Pruebas

1. Prueba de API con `WebApplicationFactory`/cliente de prueba para estado HTTP y JSON.
2. Prueba smoke del frontend en navegador (Playwright recomendado) que abre la app, observa respuesta exitosa de `/api/health` y comprueba que existe el Player/composición.
3. Comprobación de build Vite + comprobación de bundle/entrada Remotion sin renderizar vídeo.
4. Script de integración que prepare o requiera los tres procesos y falle con diagnóstico claro si API, Vite o composición no están disponibles.
5. Verificar que los perfiles de desarrollo y ejecución integrada solo enlazan en loopback y que las instrucciones funcionan desde Windows PowerShell.

El uso de Playwright añade una dependencia de prueba, pero permite validar el recorrido real browser→proxy→API y el montaje de Player; si se busca minimizar dependencias, puede degradarse a smoke HTTP más pruebas de componentes, aceptando que no se probará el montaje real de navegador.

## Seguridad, datos e impacto

- Los perfiles documentados configuran Vite y la API para escuchar únicamente en loopback, nunca en `0.0.0.0`. Esta restricción depende de la configuración suministrada: la aplicación no valida ni rechaza una URL externa si se sobrescribe mediante parámetros o variables de entorno.
- No guardar proyectos ni biblioteca bajo `src` o el directorio de publicación; esta etapa no crea ni migra datos de usuario.
- No exponer secretos al frontend. La etapa no requiere credenciales.
- Evitar shell concatenado y entradas externas; no hay lanzamiento de procesos de render en alcance.

## Riesgos y mitigaciones

- Versiones incompatibles de Remotion/React/Node: fijar versiones en lockfile y validar `npm ci`, build web y bundle renderer en Windows.
- Dependencia de runtimes instalados en la máquina: documentar .NET SDK y Node requeridos; distribución autocontenida queda fuera.
- Expectativa de app nativa: aclarar en README que el primer esqueleto abre una aplicación web local; un wrapper requeriría decisión separada.
- Licencia de Remotion: evaluar sus condiciones antes de la distribución comercial o de automatizar renders comerciales. Este cambio no acepta la licencia en nombre del usuario ni añade automáticamente `acknowledgeRemotionLicense`.

## Alternativas consideradas

- **ASP.NET Core SPA template:** ofrece integración oficial de frontend/backend y puede arrancar el servidor JS, pero la arquitectura del repositorio ya separa `src/web` y `src/api`, y el tooling debe acomodar Vite/Remotion. Se recomienda conservar esa separación y usar proxy explícito para mantener control simple.
- **Un servidor Node para API y Remotion:** rechazado porque contradice ASP.NET Core como backend documentado.
- **Microservicio/daemon Remotion:** rechazado en esta etapa por añadir despliegue, protocolo y ciclo de vida antes de que haya trabajos de render.
- **Electron/Tauri:** aplazado porque no aparece en el stack aprobado y ampliaría empaquetado/actualizaciones más allá del esqueleto web local.

## Referencias

- https://www.remotion.dev/docs/player
- https://www.remotion.dev/docs/renderer/render-media
- https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/react
- https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core
- https://nodejs.org/en/about/previous-releases