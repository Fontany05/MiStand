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


