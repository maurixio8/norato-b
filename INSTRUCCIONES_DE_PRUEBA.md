# INSTRUCCIONES PARA PROBAR NORATO B

## 🚀 URLs de Acceso
- **Página Principal**: http://localhost:3003
- **Dashboard Admin**: http://localhost:3003/admin

## 📋 Flujo de Prueba Completo

### 1. Agendar Cita (Cliente)
1. Entra a http://localhost:3003
2. Haz clic en el botón "Reservar Cita Ahora" (en el Hero)
3. Paso 1: Selecciona un servicio (ej: "Corte Mujer & Styling - $95K")
4. Paso 2: Selecciona fecha y hora disponible
5. Paso 3: Ingresa tus datos:
   - Nombre: Juan Pérez
   - Teléfono: 3001234567
   - Email: juan@email.com
6. Haz clic en "Confirmar Cita"
7. En la pantalla de confirmación, haz clic en "Confirmar por WhatsApp"
8. Se abrirá WhatsApp con mensaje pre-escrito

### 2. Verificar en Dashboard Admin
1. Entra a http://localhost:3003/admin
2. Verás la cita agendada en la lista del día
3. Podrás ver:
   - Nombre del cliente
   - Servicio seleccionado
   - Hora de la cita
   - Teléfono y email
4. Los botones de acción:
   - "Confirmar": Cambia estado a confirmada
   - "Cancelar": Cambia estado a cancelada
   - "Completar": (si está confirmada) cambia a completada

### 3. Gestionar Precios
1. En el dashboard admin, haz clic en "Editar Precios"
2. Modifica el precio de cualquier servicio
3. Haz clic en "Guardar Precios"
4. Los precios se guardan localmente y persisten en la sesión

## 🔍 Verificación
- ✅ El botón "Reservar Cita Ahora" del Hero abre el modal
- ✅ Las citas se guardan en la base de datos SQLite
- ✅ El nombre del servicio aparece en el dashboard
- ✅ Los estados se actualizan correctamente
- ✅ WhatsApp abre con mensaje pre-escrito
- ✅ Los precios se pueden editar y guardar

## 📱 Características Demo
- Base de datos SQLite local (dev.db)
- Sin registro de clientes requerido
- Confirmación por WhatsApp manual
- Dashboard móvil-first
- Animaciones profesionales
- 100% responsive

## ⚠️ Notas para Producción
- Cambiar a PostgreSQL real
- Actualizar número de WhatsApp
- Agregar autenticación al admin
- Configurar dominio personalizado