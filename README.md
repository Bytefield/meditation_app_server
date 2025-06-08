# MeditApp - Backend

API REST para la aplicación de meditación personalizada MeditApp. Desarrollada con Node.js, Express y MongoDB.

## 🚀 Características

- Autenticación basada en JWT (JSON Web Tokens)
- Manejo seguro de contraseñas con bcrypt
- API RESTful siguiendo las mejores prácticas
- Manejo centralizado de errores
- Validación de datos
- Seguridad mejorada con CORS y protección de rutas

## 📦 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- MongoDB (local o Atlas)

## 🛠️ Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` basado en `.env.example`
4. Configurar las variables de entorno necesarias
5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/meditapp
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

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
