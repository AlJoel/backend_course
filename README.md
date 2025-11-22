# Clínica Médica “Salud Integral” – Backend  
### Proyecto Final – Grupo 9 “TechSolutions”

##Integrantes
- **Álvarez, Joel** – Base de Datos  
- **Keiner, Ariana** – Frontend (Pug)  
- **Matulionis, Sebastián** – Backend  
- **Ocampo, Fabiola** – QA & Documentación  


## Descripción del Proyecto
Sistema backend para la gestión administrativa de la Clínica Médica **Salud Integral”**, desarrollado con Node.js, Express, MongoDB y Pug.

Incluye módulos de:
- Empleados  
- Pacientes  
- Turnos  
- Tareas  
- Login y autenticación  
- Roles y permisos (Administrador)

La aplicación utiliza arquitectura MVC, autenticación con passport, vistas dinámicas en Pug y modelos definidos con Mongoose.


## Tecnologías utilizadas
- Node.js  
- Express  
- MongoDB Atlas  
- Mongoose  
- Pug  
- Passport & Passport-Local  
- Express-session  
- Cookie-parser  
- Method-override  
- Dotenv  

## Usuario Administrador 
Único usuario con acceso completo al CRUD de Empleados:

_Usuario: admin
_Contraseña: admin123



## Estructura de carpetas
/controllers
/models
/routes
/views
/public
/middleware
.env
index.js


## Configuración del archivo .env

PORT=3000
MONGODB_URI=mongodb+srv://smat_db_user:3Mui7hXah64H4APz@cluster0.okbasto.mongodb.net/?appName=Cluster0
SECRET=claveSecreta123


## Funcionalidades Principales

### Empleados
- Alta, baja, modificación y listado  
- Vista Pug + API REST  

### Pacientes
- Crear, editar, eliminar y buscar  
- CRUD completo mediante Mongoose  

### Turnos
- Asignación, edición, cancelación  
- Validación de fecha y hora  

### Tareas
- Gestión por estado  
- Filtrado dinámico  

### Autenticación
- Login  
- Sesiones  
- Middleware `esAdmin` para proteger rutas  


## Cómo ejecutar el proyecto

npm install
npm start


Acceder a:
**http://localhost:3000**



## Pruebas
Realizadas con Postman:

- CRUD empleados  
- CRUD pacientes  
- CRUD turnos  
- CRUD tareas  
- Prueba de login  


##  Estado del Proyecto
Proyecto funcional y documentado.  
Basado en arquitectura MVC + autenticación + MongoDB.
