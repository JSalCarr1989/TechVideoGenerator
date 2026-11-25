# Tareas: Esqueleto ejecutable inicial

## 1. Preparar estructura y dependencias

- [x] 1.1 Crear los proyectos en `src/web`, `src/api` y `src/renderer`, manteniendo la separación React/Vite, ASP.NET Core y composiciones Remotion.
- [x] 1.2 Elegir y fijar versiones estables compatibles de Node.js, .NET, React, TypeScript, Vite y Remotion; alinear las versiones `@remotion/*` y añadir lockfile.
- [x] 1.3 Añadir ignore/configuración de salida para que artefactos de build y dependencias no se mezclen con datos de usuario ni con el código fuente.

## 2. Implementar ejecución local

- [x] 2.1 Crear perfil ASP.NET Core con escucha loopback, endpoint `GET /api/health` y respuesta JSON estable.
- [x] 2.2 Configurar Vite para escuchar en loopback y proxificar `/api` al backend según el perfil local.
- [x] 2.3 Añadir modo de hosting integrado: ASP.NET Core sirve el build estático de Vite y mantiene las rutas `/api` separadas.
- [x] 2.4 Añadir comandos/scripts locales y documentar pre-requisitos, puertos, inicio, build y diagnóstico desde PowerShell.

## 3. Integrar Remotion

- [x] 3.1 Crear una composición Remotion mínima, determinista y compartida entre el Player y el punto de entrada del renderer.
- [x] 3.2 Montar Remotion Player en la vista inicial sin implementar editor ni datos de proyecto.
- [x] 3.3 Añadir una comprobación de bundle/compilación Remotion que no renderice MP4 ni inicie un servicio independiente.

## 4. Pruebas y aceptación

- [x] 4.1 Añadir prueba de integración de API para el endpoint de estado y sus códigos/respuesta.
- [x] 4.2 Añadir smoke de navegador que verifique la UI, la respuesta de API y el montaje de la composición Player.
- [x] 4.3 Añadir verificación de build Vite y bundle Remotion como parte de los checks locales.
- [x] 4.4 Ejecutar las pruebas en Windows y documentar cualquier requisito adicional (por ejemplo, browser de Playwright); no declarar pruebas aprobadas sin resultados observados.
- [x] 4.5 Verificar que los puertos solo enlazan loopback y que el flujo de desarrollo y el integrado sirven correctamente `/` y `/api/health`.

## Criterio de terminado

- La estructura refleja la arquitectura aprobada.
- La interfaz, API y composición pueden ejecutarse/compilarse localmente con requisitos documentados.
- El recorrido de prueba comprueba UI→API y el montaje Remotion sin exportación de vídeo.
- No se añade base de datos, almacenamiento de proyectos, IA, microservicio ni instalador.