# 🔍 EncontremosPega - Monorepo

Plataforma web para conectar profesionales chilenos con oportunidades laborales en startups y empresas innovadoras.

## 📁 Estructura del Proyecto

```
EncontremosPega/
├── apps/
│   ├── frontend/         # React + Vite frontend
│   └── backend/          # Express.js API backend
├── packages/             # Paquetes compartidos (futuro)
├── package.json          # Configuración del monorepo
└── README.md
```

## 🚀 Instalación y Desarrollo

### Setup inicial
```bash
npm install
```

### Desarrollo
```bash
# Ejecutar frontend únicamente
npm run dev:frontend

# Ejecutar backend únicamente  
npm run dev:backend

# Ejecutar ambos al mismo tiempo
npm run dev:all
```

### URLs de desarrollo
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## 📡 API Endpoints

- `GET /api/health` - Health check del servidor
- `GET /api/companies` - Obtener todas las empresas
- `GET /api/companies/:id` - Obtener empresa específica
- `POST /api/recommendations` - Obtener recomendaciones basadas en perfil de usuario

## 🏗️ Tecnologías

### Frontend
- React 19
- TypeScript
- Vite
- React Router

### Backend
- Node.js
- Express.js
- Archivos JSON (base de datos simple)
- CORS configurado

## 📦 Scripts Disponibles

```bash
npm run dev:frontend     # Desarrollo frontend
npm run dev:backend      # Desarrollo backend  
npm run dev:all         # Ambos al mismo tiempo
npm run build:frontend  # Build frontend
npm run build:backend   # Build backend
npm run build           # Build completo
```


