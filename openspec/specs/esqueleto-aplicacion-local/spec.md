# esqueleto-aplicacion-local Specification

## Purpose

TBD - created by archiving change initial-executable-skeleton. Update Purpose after archive.

## Requirements

### Requirement: Estructura separada por responsabilidad
El repositorio DEBE disponer de proyectos diferenciados para la interfaz web, la API local y las composiciones/herramientas Remotion, manteniendo el modelo de escena y las composiciones desacoplados de la implementación visual del editor.

#### Scenario: Inspeccionar la estructura inicial
- DADO que se consulta el árbol fuente del repositorio
- CUANDO se identifican los componentes ejecutables
- ENTONCES la interfaz se encuentra bajo `src/web`, la API bajo `src/api` y el código de composición Remotion bajo `src/renderer`
- Y no se añaden servicios distribuidos ni infraestructura en la nube.

### Requirement: Ejecución local en Windows
La aplicación DEBE poder iniciarse localmente con instrucciones reproducibles y dependencias documentadas, sin requerir GPU, infraestructura remota ni credenciales de IA.

#### Scenario: Ejecutar en modo desarrollo
- DADO que Node.js y el SDK de .NET compatibles están instalados
- CUANDO se inician la API ASP.NET Core y Vite siguiendo la guía del repositorio
- ENTONCES ambos procesos escuchan únicamente en loopback
- Y la interfaz queda disponible en el servidor de desarrollo Vite
- Y las solicitudes `/api/*` se reenvían a la API local.

#### Scenario: Ejecutar el frontend compilado
- DADO que se ha compilado el frontend
- CUANDO se ejecuta la API en el perfil local integrado
- ENTONCES ASP.NET Core sirve los recursos estáticos del frontend y las rutas de API desde el mismo origen
- Y la aplicación puede abrirse en un navegador local sin servidor externo.

### Requirement: Comunicación entre interfaz y API
La interfaz DEBE comunicarse con la API ASP.NET Core a través de HTTP usando rutas relativas `/api`; la API DEBE exponer un endpoint mínimo de estado para comprobar disponibilidad.

#### Scenario: Consultar estado desde la interfaz
- DADO que frontend y API están activos
- CUANDO la interfaz solicita `/api/health`
- ENTONCES recibe una respuesta JSON de estado satisfactorio
- Y no necesita conocer una URL externa ni habilitar CORS para el modo local previsto.

#### Scenario: API no disponible
- DADO que la API local no está disponible
- CUANDO la interfaz solicita su estado
- ENTONCES la condición se muestra como error de conexión recuperable y no como disponibilidad confirmada.

### Requirement: Integración mínima de Remotion
El proyecto DEBE incluir una composición Remotion mínima y renderizable, y el frontend DEBE poder previsualizar esa composición usando Remotion Player. El código de composición compartido no DEBE duplicarse entre vista previa y punto de entrada de render. Player se integra directamente en React; la API ASP.NET Core no inicia ni controla un proceso renderer, y el renderizado de vídeo queda fuera de este cambio.

#### Scenario: Cargar la vista previa
- DADO que Vite está activo
- CUANDO se abre la página inicial
- ENTONCES se monta Remotion Player con una composición de prueba estática y determinista
- Y la composición puede construirse mediante las herramientas locales de Remotion.

### Requirement: Pruebas de integración básicas
El repositorio DEBE ofrecer comprobaciones automatizadas para los límites de integración de UI/API y para la compilación de la composición, además de pasos documentados para ejecutar la suite local.

#### Scenario: Comprobar el recorrido local mínimo
- DADO que se ejecuta la suite de integración en Windows
- CUANDO se inicia la aplicación en el perfil de prueba
- ENTONCES una prueba verifica la respuesta de `/api/health` a través del proxy/ruta de aplicación
- Y una prueba verifica que la página inicial carga y monta la composición Player
- Y una prueba verifica que el punto de entrada Remotion puede generar su bundle o completar una comprobación equivalente sin exportar vídeo.
