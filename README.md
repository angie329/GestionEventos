# Plataforma Web para la Gestión y Organización de Eventos

Este proyecto constituye el entregable final de la asignatura **Lenguajes de Programación**. Consiste en un sistema integral para la administración de eventos académicos y comunitarios, basado en una arquitectura desacoplada.

El sistema se divide en:
* **Backend:** API REST desarrollada en el framework **Laravel** para la gestión de lógica de negocio y persistencia de datos.
* **Frontend:** Aplicación cliente desarrollada en **HTML, CSS y JavaScript** que interactúa con el backend mediante peticiones asíncronas.


## Tecnologías utilizadas

### Backend
* **PHP:** 8.5.1
* **Laravel:** 12.44.0
* **Base de datos:** MySQL
* **Gestor de dependencias:** Composer 2.9.2
* **Herramienta de pruebas:** Postman

### Frontend
* **HTML5**
* **CSS3**
* **JavaScript**

### Control de versiones y herramientas
* **Git / GitHub**
* **Servidor local:** XAMPP, Laragon o similar

---

## Requisitos previos

Antes de ejecutar el proyecto, es necesario tener instalado:
* PHP 8.5.1 o superior
* Composer 2.x
* MySQL
* Git
* Navegador web moderno (Chrome, Edge, Firefox)

---

## Estructura del proyecto

```text
GestionEventos/
├── backend/            # Lógica del servidor y API
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── config/
│   ├── resources/
│   ├── public/
│   ├── .env.example
│   ├── composer.json
│   └── artisan
│
├── frontend/           # Interfaz de usuario y lógica cliente
│   ├── css/
│   ├── js/
│   ├── assets/
│   ├── index.html
│   ├── eventos.html
│   ├── detalle.html
│   ├── crear.html
│   ├── editar.html
│   └── inscritos.html
│
└── README.md
```


## Instrucciones para ejecutar el Backend

### 1. Clonar el repositorio
```bash
git clone https://github.com/angie329/GestionEventos
cd GestionEventos/backend
```
### 2. Instalar dependencias del backend
```bash
composer install
```

### 3. Configurar el archivo de entorno
Copiar el archivo de ejemplo:

```bash
cp .env.example .env
```
Configurar los datos de la base de datos en el archivo .env:
```bash
DB_DATABASE=eventos
DB_USERNAME=root
DB_PASSWORD=
```
### 4. Generar la clave de la aplicación
```bash
php artisan key:generate
```
### 5. Ejecutar las migraciones
```bash
php artisan migrate
```
### 6. Levantar el servidor del backend
```bash
php artisan serve
```

El backend estará disponible en: http://127.0.0.1:8000

## Instrucciones para ejecutar el Frontend
Ingresar a la carpeta del frontend:

```bash
cd ../frontend
```
Abrir el archivo index.html en un navegador web.

## Endpoints implementados
| Funcionalidad           | Método | Endpoint                       |
|-------------------------|--------|--------------------------------|
| Crear evento            | POST   | `/api/eventos`                 |
| Listar eventos          | GET    | `/api/eventos`                 |
| Ver detalle del evento  | GET    | `/api/eventos/{id}`            |
| Editar evento           | PUT    | `/api/eventos/{id}`            |
| Listar inscritos        | GET    | `/api/eventos/{id}/inscritos`  |


## Integrantes del grupo

- Angie Alfonso Molina  
- Sergio Rodríguez Pineda  
- Bryan Zhang Plaza  

## Repositorio del proyecto

https://github.com/angie329/GestionEventos
