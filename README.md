# Norato B - Peluquería Premium

Aplicación web moderna para agendamiento de citas en peluquería con dashboard administrativo.

## 🚀 Demo

**URL de producción**: https://norato-b.vercel.app

- Primero visita la landing page elegante: [https://norato-b.vercel.app/landing](https://norato-b.vercel.app/landing)
- Haz clic en "INGRESAR" para ver la aplicación principal
- Dashboard admin: [https://norato-b.vercel.app/admin](https://norato-b.vercel.app/admin)

## Características

- **Landing Page Premium** - Entrada elegante con animaciones
- **Sistema de Agendamiento** funcional para clientes
- **Confirmación por WhatsApp** (abre app con mensaje pre-escrito)
- **Dashboard Admin** móvil-first para gestión de citas
- **Gestión de Precios** editable desde el admin
- **100% Responsive** con diseño móvil-first
- **Animaciones Profesionales** con Framer Motion
- **Datos Mock** para demo (se reinician al recargar servidor)

## Stack Tecnológico

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: API Routes de Next.js + Mock Data
- **Animaciones**: Framer Motion
- **Icons**: Lucide React
- **Deploy**: Vercel

## Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/norato-b.git
cd norato-b

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## Estructura del Proyecto

```
norato-app/
├── src/
│   ├── app/
│   │   ├── landing/       # Página de bienvenida elegante
│   │   ├── home/          # Aplicación principal
│   │   ├── admin/         # Dashboard administrativo
│   │   └── api/           # API endpoints
│   ├── components/        # Componentes React
│   └── lib/              # Utilidades
├── public/
└── prisma/
```

## Flujo de Citas

1. **Cliente** visita la landing → Clic en "INGRESAR"
2. **Selecciona** "Reservar Cita"
3. **Elige** servicio → fecha → hora → datos
4. **Recibe** confirmación con mensaje para WhatsApp
5. **Envía** mensaje manual al número de la peluquería
6. **Admin** ve cita en dashboard y confirma/cancela

## Configuración para Producción

1. **Reemplazar datos mock con base de datos real**:
   - Configurar Prisma con PostgreSQL
   - Descomentar imports de Prisma en archivos API

2. **Actualizar número de WhatsApp**:
   - Editar `src/components/BookingModal.tsx` línea 89

3. **Configurar dominio personalizado** en Vercel

## Deploy en Vercel

1. Conectar repositorio GitHub a Vercel
2. Configurar variables de entorno si es necesario
3. Deploy automático en cada push

## Notas

- Los datos son temporales (mock) para el demo
- Los precios se guardan en localStorage del admin
- Las citas persisten durante la sesión del servidor
- Para producción, reemplazar mock data con base de datos real

## Licencia

Proyecto demo para Norato B Peluquería.