# QuinielaBadger - Plataforma de Quinielas Deportivas

## Descripción
QuinielaBadger es una aplicación web para la gestión de quinielas deportivas de fútbol, especialmente enfocada en la Liga MX. Permite a los usuarios participar en quinielas, ver resultados y administrar su cuenta.

## Cómo ejecutar la aplicación

### Opción 1: Usando un servidor web local (recomendado)
Para una experiencia completa y aprovechar todas las funcionalidades, se recomienda ejecutar la aplicación a través de un servidor web local:

1. Instala Node.js desde [nodejs.org](https://nodejs.org/)
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta el comando `npx http-server` o `python -m http.server` (si tienes Python instalado)
4. Abre tu navegador y ve a `http://localhost:8080` o la URL que te indique el servidor

### Opción 2: Versión compatible para abrir localmente
Si no puedes instalar un servidor web, hemos incluido una versión compatible que funciona abriendo los archivos directamente:

1. Abre el archivo `index-compatible.html` en tu navegador
2. Esta versión utiliza JavaScript tradicional sin módulos ES6 para mayor compatibilidad

## Características principales

- Participación en quinielas deportivas de fútbol
- Visualización de próximos partidos y resultados
- Registro e inicio de sesión de usuarios
- Panel de administración para gestionar quinielas
- Seguimiento de ganadores y premios

## Notas importantes

- La aplicación hace uso de módulos ES6 en su versión principal, lo que puede generar problemas de CORS al abrirla directamente como archivo local.
- La versión compatible (`index-compatible.html`) resuelve estos problemas para uso local.
- Los datos son simulados y se almacenan localmente en el navegador.

## Usuarios de prueba

| Usuario | Contraseña | Tipo |
|---------|------------|------|
| admin   | admin123   | Administrador |
| usuario | user123    | Usuario normal |

## Tecnologías utilizadas

- HTML5, CSS3, JavaScript
- Bootstrap 5
- LocalStorage para persistencia de datos

## Estructura de Archivos

```
/
├── index.html           # Archivo principal HTML
├── css/
│   └── styles.css       # Estilos personalizados
├── js/
│   └── script.js        # Funcionalidad JavaScript
└── README.md            # Este archivo
```

## Características

- Diseño responsive que se adapta a dispositivos móviles y de escritorio
- Menú lateral tipo cascada con iconos
- Sistema de autenticación simulado para demostración
- Panel de administración con funciones exclusivas
- Formularios interactivos con validación

## Autor

QuinielaBadger Team / Jose Andres Aguirre Rios
