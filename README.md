Gestión de Eventos – Backend

Este proyecto contiene el backend de la plataforma web para la gestión y organización de eventos académicos y comunitarios, desarrollado para la materia Lenguajes de Programación.

El backend fue implementado utilizando Laravel y expone una API REST para la gestión de eventos.

--------------------------------------------------
Tecnologías utilizadas
--------------------------------------------------
- PHP 8.x
- Laravel
- MySQL
- Composer
- Postman (para pruebas)

--------------------------------------------------
Requisitos previos
--------------------------------------------------
Antes de ejecutar el proyecto se debe tener instalado:
- PHP 8.x
- Composer
- MySQL
- Git

--------------------------------------------------
Cómo ejecutar el proyecto
--------------------------------------------------

# 1. Clonar el repositorio

git clone https://github.com/angie329/GestionEventos
cd GestionEventos/backend

# 2. Instalar dependencias

composer install

# 3. Configurar el archivo .env

Copiar el archivo de ejemplo:
cp .env.example .env

Configurar la base de datos:
DB_DATABASE=eventos
DB_USERNAME=root
DB_PASSWORD=

# 4. Generar la clave de la aplicación

php artisan key:generate

# 5. Ejecutar migraciones

php artisan migrate

# 6. Levantar el servidor

php artisan serve

El backend estará disponible en:
http://127.0.0.1:8000

--------------------------------------------------
Endpoints implementados (Avance 1)
--------------------------------------------------

Crear evento
POST /api/eventos

Listar eventos
GET /api/eventos

Los endpoints pueden ser probados utilizando Postman.

--------------------------------------------------
Integrantes del grupo
--------------------------------------------------
- Angie Alfonso
- Sergio Rodriguez
- Bryan Zhang

--------------------------------------------------
Notas
--------------------------------------------------
El proyecto se encuentra en desarrollo y algunas funcionalidades pueden estar pendientes.
