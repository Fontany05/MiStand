# MiStand API 🛍️

API REST para gestión de stands digitales para emprendedores que venden productos artesanales en ferias y mercados.

## 📋 Descripción

MiStand permite a emprendedores mostrar su catálogo en tiempo real, comunicar dónde están cada fin de semana y recibir consultas directamente por WhatsApp.

## 🚀 Stack tecnológico

- **NestJS** — framework de Node.js
- **PostgreSQL** — base de datos relacional
- **Prisma** — ORM
- **JWT** — autenticación
- **Swagger** — documentación

## ⚙️ Requisitos

- Node.js v20+
- PostgreSQL
- npm

## 🔧 Instalación

1. Cloná el repositorio
\```bash
git clone https://github.com/tu-usuario/mistand-backend
cd mistand-backend
\```

2. Instalá las dependencias
\```bash
npm install
\```

3. Configurá las variables de entorno
\```bash
cp .env.example .env
\```

4. Corré las migraciones
\```bash
npx prisma migrate dev
\```

5. Levantá el servidor
\```bash
npm run start:dev
\```

## 🌐 Documentación

Una vez levantado el servidor, accedé a la documentación en:
http://localhost:3000/api


## 🚀 Deploy

### Base de datos — Neon

1. Creá una cuenta en [neon.tech](https://neon.tech)
2. Creá un nuevo proyecto con PostgreSQL 16
3. Copiá la `DATABASE_URL` de Connection String
4. Reemplazá temporalmente la `DATABASE_URL` en `.env` con la de Neon
5. Corré las migraciones:
\```bash
npx prisma migrate deploy
\```
6. Volvé a poner tu `DATABASE_URL` local en `.env`

### API — Render

1. Creá una cuenta en [render.com](https://render.com)
2. New → Web Service → conectá tu repositorio de GitHub
3. Configurá:
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm run start:prod`
4. Agregá las variables de entorno:
   - `DATABASE_URL` → tu URL de Neon
   - `JWT_SECRET` → tu clave secreta
   - `NODE_ENV` → production
5. Accedé a `https://tu-app.onrender.com/api` para ver Swagger público

### ✅ Checklist antes de cada deploy

- Dependencias necesarias en `dependencies` no en `devDependencies`
- Variables de entorno configuradas en Render
- Migraciones aplicadas en Neon
- Build local funciona — `npm run build`
- Commit y push al repositorio

