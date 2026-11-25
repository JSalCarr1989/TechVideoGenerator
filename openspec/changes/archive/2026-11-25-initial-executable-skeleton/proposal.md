# Propuesta: Esqueleto ejecutable inicial

## Resumen

Establecer la estructura y configuración mínima para ejecutar localmente en Windows una aplicación formada por React + TypeScript + Vite, ASP.NET Core y Remotion. El resultado será una base compilable y comprobable, no todavía un editor ni un flujo de renderizado de vídeo.

## Problema y valor

El repositorio contiene la definición del producto y la arquitectura, pero aún no tiene la estructura ejecutable indicada en `docs/ARCHITECTURE.md`. Sin una base común no se pueden validar pronto las decisiones de separación entre interfaz, API y motor visual. Este cambio dará un punto de partida local, reproducible y limitado al MVP.

## Alcance

- Establecer `src/web`, `src/api` y `src/renderer`, con responsabilidades separadas.
- Integrar React, TypeScript y Vite; ASP.NET Core/C#; Remotion Player y composición mínima de comprobación.
- Definir los perfiles de ejecución local de desarrollo y la forma de servir el frontend compilado desde la API para una ejecución integrada en loopback.
- Habilitar comunicación HTTP del frontend con la API por rutas `/api`, evitando CORS mediante proxy en desarrollo y mismo origen en ejecución integrada.
- Añadir comprobaciones de integración básicas que verifiquen el arranque de la interfaz, la API y la composición, así como los dos enlaces implementados: React consulta `/api/health` y Remotion Player se integra directamente en React utilizando la composición compartida. No se valida ni se presupone una conexión entre la API y un proceso renderer.
- Documentar requisitos previos, comandos y resultados esperados.

## Fuera de alcance

- Editor visual, modelo de escenas, persistencia de proyectos, biblioteca de recursos y gestión de archivos de usuario.
- Renderizado de vídeo, incluido MP4, colas de trabajos, progreso, cancelación o protocolo de producción entre API y proceso Remotion. La API ASP.NET Core no inicia, controla ni se comunica con un proceso renderer en este cambio.
- Integración de IA, credenciales, servicios en la nube, microservicios, instalador o empaquetado como aplicación de escritorio.
- Diseñar ahora el esquema de datos de escenas.

## Decisiones recomendadas para revisión

1. Tratar la primera ejecución como aplicación web local en el navegador, enlazada únicamente a `localhost`/loopback; no introducir Electron/Tauri sin una propuesta específica.
2. Usar .NET 10 LTS y Node.js 24 LTS como líneas de referencia iniciales; fijar versiones exactas compatibles al implementar y registrar el lockfile. .NET 11 es STS, por lo que no se recomienda para esta base LTS.
3. Mantener una única composición Remotion reutilizable por Player y herramienta de composición, pero aplazar el contrato API→proceso de render hasta que se aprueben los trabajos de render.
4. En desarrollo, iniciar Vite y API por separado; el proxy de Vite reenvía `/api` a ASP.NET Core. Para una ejecución local integrada, ASP.NET Core sirve el `dist` de Vite bajo el mismo origen.

## Riesgos y pendientes

- La arquitectura no especifica si «aplicación local» debe ser una ventana de escritorio o navegador. Esta propuesta recomienda navegador local; requiere aprobación explícita antes de ampliar a un wrapper de escritorio.
- Los perfiles documentados configuran escucha loopback, pero la aplicación no rechaza explícitamente URLs externas si se sobrescribe esa configuración mediante parámetros o variables de entorno. Esta limitación debe considerarse al cambiar los comandos de arranque.
- Las condiciones de licencia de Remotion deben evaluarse antes de la distribución comercial o de automatizar renders comerciales; este cambio no confirma la licencia en nombre del usuario. Todas las dependencias `@remotion/*` deben fijarse a la misma versión exacta.

## Fuentes técnicas consultadas

- Remotion `renderMedia()` y render programático en Node: https://www.remotion.dev/docs/renderer/render-media
- Remotion Player embebido en aplicaciones React: https://www.remotion.dev/docs/player
- Ciclo de soporte de .NET: https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core
- Versiones LTS de Node.js: https://nodejs.org/en/about/previous-releases
- Integración React y ASP.NET Core / uso de Vite: https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/react