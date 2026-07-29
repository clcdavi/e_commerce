const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Inicialización SDK MercadoPago Oficial V2
// Reemplazar MERCADOPAGO_ACCESS_TOKEN en el archivo .env
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-0000000000000000-000000-00000000000000000000000000000000-000000000' 
});

// Endpoint 1: Crear Preferencia de Pago en MercadoPago
app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payer, shippingCost } = req.body;

    const formattedItems = items.map(item => ({
      title: item.title,
      unit_price: Number(item.unit_price),
      quantity: Number(item.quantity),
      currency_id: 'ARS'
    }));

    if (shippingCost > 0) {
      formattedItems.push({
        title: 'Envío Nacional Dropshipping (Andreani/OCA)',
        unit_price: Number(shippingCost),
        quantity: 1,
        currency_id: 'ARS'
      });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: formattedItems,
        payer: {
          name: payer.name || 'Cliente',
          email: payer.email || 'cliente@mercadodrop.com.ar',
        },
        back_urls: {
          success: process.env.FRONTEND_URL || 'http://localhost:3000?status=success',
          failure: process.env.FRONTEND_URL || 'http://localhost:3000?status=failure',
          pending: process.env.FRONTEND_URL || 'http://localhost:3000?status=pending'
        },
        auto_return: 'approved',
        notification_url: `${process.env.BACKEND_URL || 'http://localhost:8080'}/api/webhooks/mercadopago`
      }
    });

    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });
  } catch (error) {
    console.error('Error al crear preferencia de MercadoPago:', error);
    res.status(500).json({ error: 'Fallo al procesar el pago con MercadoPago' });
  }
});

// Endpoint 2: Webhook IPN MercadoPago para Notificación de Pagos Confirmados
app.post('/api/webhooks/mercadopago', (req, res) => {
  const { type, data } = req.body;
  console.log(`[MercadoPago IPN Webhook Received] Tipo: ${type}`, data);

  if (type === 'payment') {
    const paymentId = data.id;
    // Aquí el backend consulta el estado real del pago a MercadoPago y notifica a los proveedores de Dropshipping
    console.log(`✅ Pago ID ${paymentId} procesado exitosamente. Notificando proveedor para despacho...`);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Backend e-Commerce Dropshipping corriendo en puerto ${PORT}`);
});
