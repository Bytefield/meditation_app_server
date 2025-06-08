# Rago Meditation API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

API RESTful para la aplicación de meditación personalizada Rago Meditation. Desarrollada con Node.js, Express y MongoDB, proporciona los servicios necesarios para la autenticación, gestión de usuarios y seguimiento de meditaciones.

## 🚀 Características Principales

### Autenticación y Autorización
- Autenticación basada en JWT (JSON Web Tokens)
- Cookies HTTP-Only para almacenamiento seguro de tokens
- Manejo seguro de contraseñas con bcrypt
- Control de acceso basado en roles (usuario/administrador)

### Calidad del Código
- Validación de datos con express-validator
- Manejo centralizado de errores
- Logging estructurado con Winston
- Variables de entorno para configuración

### Seguridad
- Protección contra ataques comunes (Helmet)
- Prevención de inyección de consultas
- Rate limiting
- CORS configurado de forma segura
- Headers de seguridad

### Rendimiento
- Conexión eficiente a MongoDB con Mongoose
- Índices para consultas frecuentes
- Compresión de respuestas
- Caché de respuestas

## 🛠️ Requisitos Previos

### Para Desarrollo
- [Node.js](https://nodejs.org/) 18.x LTS o superior
- [npm](https://www.npmjs.com/) 9.x o [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) 6.0+ (local o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register))
- [Git](https://git-scm.com/)

### Para Producción
- Servidor con Node.js 18.x
- Base de datos MongoDB (autogestionada o MongoDB Atlas)
- Servidor web (Nginx, Apache) como proxy inverso
- Certificado SSL (recomendado)

## 🚀 Empezando

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Bytefield/meditation_app_server.git
   cd meditation_app_server
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn
   ```

3. **Configuración del entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus configuraciones:
   ```env
   # Configuración del servidor
   PORT=3000
   NODE_ENV=development
   
   # Base de datos
   MONGODB_URI=mongodb://localhost:27017/meditation_app
   
   # Autenticación
   JWT_SECRET=tu_clave_secreta_muy_segura
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   
   # Frontend
   FRONTEND_URL=http://localhost:3000
   
   # Logging
   LOG_LEVEL=info
   ```

4. **Iniciar el servidor**
   ```bash
   # Modo desarrollo (con recarga automática)
   npm run dev
   
   # Modo producción
   npm start
   
   # Con PM2 (recomendado para producción)
   npm install -g pm2
   pm2 start server.js --name "meditation-api"
   ```

5. **Verificar la instalación**
   ```bash
   curl http://localhost:3000/api/v1/health
   ```
   Deberías recibir una respuesta como: `{"status":"ok","message":"API is running"}`

## ⚙️ Configuración

### Variables de Entorno

| Variable | Requerido | Valor por defecto | Descripción |
|----------|-----------|------------------|-------------|
| PORT | No | 3000 | Puerto en el que se ejecutará el servidor |
| NODE_ENV | No | development | Entorno de ejecución (development, production, test) |
| MONGODB_URI | Sí | - | URL de conexión a MongoDB |
| JWT_SECRET | Sí | - | Clave secreta para firmar los JWT |
| JWT_EXPIRE | No | 30d | Tiempo de expiración del JWT |
| JWT_COOKIE_EXPIRE | No | 30 | Días de expiración de la cookie |
| FRONTEND_URL | No | http://localhost:3000 | URL del frontend para CORS |
| LOG_LEVEL | No | info | Nivel de logging (error, warn, info, debug) |

### Estructura del Proyecto

```
src/
├── config/           # Configuraciones de la aplicación
├── controllers/       # Controladores de la API
├── middleware/        # Middlewares personalizados
├── models/            # Modelos de Mongoose
├── routes/            # Definición de rutas
├── services/          # Lógica de negocio
├── utils/             # Utilidades y helpers
└── validators/       # Esquemas de validación
```

## 📚 Documentación de la API

La documentación completa de la API está disponible en formato OpenAPI (Swagger). Para acceder a ella:

1. Inicia el servidor en modo desarrollo
2. Abre tu navegador en: `http://localhost:3000/api-docs`

### Endpoints Principales

#### Autenticación

- `POST /api/v1/auth/register` - Registrar nuevo usuario
- `POST /api/v1/auth/login` - Iniciar sesión
- `GET /api/v1/auth/me` - Obtener perfil del usuario actual
- `PUT /api/v1/auth/updatedetails` - Actualizar detalles del usuario
- `PUT /api/v1/auth/updatepassword` - Actualizar contraseña
- `POST /api/v1/auth/forgotpassword` - Solicitar restablecimiento de contraseña
- `PUT /api/v1/auth/resetpassword/:resettoken` - Restablecer contraseña

#### Usuarios (Admin)

- `GET /api/v1/users` - Obtener todos los usuarios (Admin)
- `GET /api/v1/users/:id` - Obtener usuario por ID (Admin)
- `POST /api/v1/users` - Crear usuario (Admin)
- `PUT /api/v1/users/:id` - Actualizar usuario (Admin)
- `DELETE /api/v1/users/:id` - Eliminar usuario (Admin)

## 🧪 Testing

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar cobertura de código
npm run test:coverage
```

### Tipos de Pruebas

- **Pruebas Unitarias**: Pruebas de funciones individuales
- **Pruebas de Integración**: Pruebas de rutas de la API
- **Pruebas de Rendimiento**: Pruebas de carga y estrés

## 🚀 Despliegue

### Requisitos de Producción

- Node.js 18.x
- MongoDB 6.0+
- PM2 (recomendado para producción)
- Nginx (como proxy inverso)
- Certificado SSL (recomendado)

### Pasos para Despliegue

1. Configurar variables de entorno en producción
2. Instalar dependencias en modo producción:
   ```bash
   npm install --production
   ```
3. Construir la aplicación (si es necesario)
4. Iniciar el servidor con PM2:
   ```bash
   pm2 start server.js --name "meditation-api"
   ```
5. Configurar Nginx como proxy inverso
6. Configurar SSL con Let's Encrypt

## 📦 Dependencias Principales

- **Runtime**: Node.js 18.x
- **Framework**: Express.js 4.18.x
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: jsonwebtoken, bcryptjs
- **Validación**: express-validator
- **Seguridad**: helmet, xss-clean, express-mongo-sanitize, hpp, cors
- **Logging**: winston, morgan
- **Testing**: Jest, Supertest
- **Documentación**: swagger-jsdoc, swagger-ui-express

## 🤝 Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter) - tu.email@ejemplo.com

Enlace del Proyecto: [https://github.com/Bytefield/meditation_app_server](https://github.com/Bytefield/meditation_app_server)

## 🗄️ Modelos de Datos

### Usuario (User)

```javascript
{
  "name": String,          // Nombre del usuario
  "email": String,         // Correo electrónico (único)
  "password": String,      // Contraseña (hasheada)
  "isAdmin": Boolean,      // Rol de administrador
  "moodHistory": [         // Historial de estados de ánimo
    {
      "mood": String,      // Estado de ánimo seleccionado
      "date": Date         // Fecha de registro
    }
  ],
  "createdAt": Date,       // Fecha de creación
  "updatedAt": Date        // Fecha de última actualización
}
```

## 🌐 Endpoints de la API

### Autenticación

#### Registrar un nuevo usuario
```
POST /api/auth/register
```
**Cuerpo de la solicitud:**
```json
{
  "name": "Usuario Ejemplo",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

#### Iniciar sesión
```
POST /api/auth/login
```
**Cuerpo de la solicitud:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

#### Cerrar sesión
```
POST /api/auth/logout
```

#### Obtener perfil del usuario
```
GET /api/auth/profile
```
*Requiere autenticación*

#### Actualizar perfil del usuario
```
PUT /api/auth/profile
```
*Requiere autenticación*

**Cuerpo de la solicitud (opcional):**
```json
{
  "name": "Nuevo Nombre",
  "email": "nuevo@email.com",
  "password": "nuevacontraseña"
}
```

## 🛡️ Seguridad

- Autenticación basada en JWT almacenados en cookies HTTP-Only
- Protección contra ataques XSS
- Validación de entrada de datos
- Manejo seguro de errores
- CORS configurado para el dominio del frontend

## 🚀 Despliegue

1. Configurar las variables de entorno para producción
2. Construir la aplicación:
   ```bash
   npm run build
   ```
3. Iniciar en producción:
   ```bash
   npm start
   ```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
