# MercadoDrop Argentina - Plataforma e-Commerce & Dropshipping

Plataforma completa de e-Commerce y red de Dropshipping orientada a proveedores y comerciantes de Argentina.

## 🚀 Características Principales

- **Landing Page & Storefront**: Estética moderna con tecnología Glassmorphism, buscador interactivo y filtrado de productos.
- **Pagos Seguros con MercadoPago**: Integración oficial SDK V2 con Checkout Pro y soporte de Webhooks IPN (`/api/webhooks/mercadopago`).
- **Red de Dropshipping**: Portal de proveedores locales para publicar productos con costos mayoristas y cálculo automático del margen de ganancia para revendedores.
- **Admin Dashboard**: Visualización de ventas, inventario sincronizado y pedidos.
- **Docker & PostgreSQL**: Preparado para despliegue multi-contenedor en instancias VPS (ej. Oracle Cloud).

## 🛠️ Requisitos Previos

- Docker & Docker Compose
- Node.js 18+

## 🚀 Despliegue Local o en VPS Oracle Cloud

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/clcdavi/e_commerce.git
   cd e_commerce
   ```

2. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```
   *Edita `.env` agregando tu `MERCADOPAGO_ACCESS_TOKEN` de Sandbox o Producción.*

3. Iniciar con Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

4. La aplicación estará accesible en: `http://localhost:8080` (o la IP pública de tu servidor Oracle).

---

Desarrollado con ❤️ para el ecosistema emprendedor de Argentina.
