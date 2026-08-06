# DateBox — Landing Page

Landing page oficial de **DateBox**, la aplicación para organizar salidas sociales, coordinar en grupo, descubrir actividades locales y guardar recuerdos compartidos.

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/)

## 🛠️ Instalación y Uso

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Levantar el servidor de desarrollo

```bash
npm run dev
```

El servidor iniciará por defecto en `http://localhost:4000/` (o la dirección que indique la consola).

### 3. Generar build de producción

```bash
npm run build
```

Los archivos compilados para producción se generarán en la carpeta `dist/`.

### 4. Previsualizar el build de producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
datebox-landing-page/
├── public/              # Archivos estáticos e imágenes
├── pages/               # Páginas secundarias
│   └── privacidad/      # Política de privacidad
├── index.html           # Página principal (Landing Page)
├── style.css            # Estilos globales y componentes UI
├── main.js              # Lógica principal e interacciones JavaScript
├── vite.config.js       # Configuración de Vite
└── package.json         # Dependencias y scripts
```

## 📄 Rutas del Proyecto

- **Landing Principal**: `/` (`index.html`)
- **Política de Privacidad**: `/privacidad` (`pages/privacidad/index.html`)
