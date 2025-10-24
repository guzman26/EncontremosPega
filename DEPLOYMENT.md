# 🚀 Guía de Deployment - EncontremosPega

## Errores Comunes en Vercel

### Error: "NOT_FOUND"
**Causa:** El build o el framework no está configurado correctamente.

**Solución:** Los archivos `vercel.json` y `.vercelignore` ya están configurados.

---

## Configuración de Vercel

### 1. **vercel.json**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "apps/frontend/dist"
}
```

**Qué hace:**
- `buildCommand`: Ejecuta el build del monorepo
- `installCommand`: Instala las dependencias
- `framework`: Especifica que usamos Vite
- `outputDirectory`: Indica dónde está el build compilado

### 2. **.vercelignore**
Archivos que Vercel debe ignorar para reducir tamaño y tiempo de build.

### 3. **package.json (root)**
```json
{
  "scripts": {
    "build": "npm run build --workspace=apps/frontend && npm run build --workspace=apps/backend"
  }
}
```

---

## Estructura del Proyecto

```
EncontremosPega/
├── apps/
│   ├── frontend/          # React + Vite (se deploya)
│   │   ├── src/
│   │   ├── dist/          ← Vercel sirve este directorio
│   │   └── package.json
│   │
│   └── backend/           # Express (serverless functions)
│       ├── src/
│       └── package.json
│
├── api/                   # Serverless functions
│   └── health.js
│
├── vercel.json           # Configuración de Vercel
├── .vercelignore         # Archivos a ignorar
└── package.json          # Root monorepo
```

---

## Variables de Entorno

En Vercel Dashboard, configura:

```
VITE_API_URL = https://encontremospega.vercel.app/api
NODE_ENV = production
```

---

## Pasos para Resolver Errores

### 1. Verificar el Build Local
```bash
npm run build
```

### 2. Verificar que dist existe
```bash
ls -la apps/frontend/dist/
```

### 3. Revisar los logs en Vercel Dashboard
- Ir a: Settings > Build and Development
- Ver el "Build Log" para detalles del error

### 4. Confirmar que el outputDirectory es correcto
```bash
# Debe existir:
apps/frontend/dist/index.html
```

### 5. Deploy desde CLI (opcional)
```bash
npm install -g vercel
vercel deploy
```

---

## Deployment Success ✅

Cuando todo esté bien:
- ✅ Build Command ejecuta sin errores
- ✅ `apps/frontend/dist/index.html` existe
- ✅ Status muestra "Ready"
- ✅ Puedes acceder a https://encontremospega.vercel.app

---

## API Endpoints

- **Health Check:** `GET /api/health`
- **Companies:** `GET /api/companies`
- **Industries:** `GET /api/industries`
- **Recommendations:** `POST /api/recommendations`

---

## Troubleshooting

### Error: "Build command exited with code 1"
→ Ejecutar `npm run build` localmente y revisar errores

### Error: "outputDirectory does not exist"
→ Verificar que `apps/frontend/dist/` existe después del build

### Error: "Module not found"
→ Ejecutar `npm install` en el root

---

## Git Push para Deploy

```bash
git add .
git commit -m "Fix deployment configuration"
git push origin main
```

Vercel detectará el cambio y hará re-deploy automáticamente.
