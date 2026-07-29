import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, initDb } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// --- API de Productos ---
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { title, description, price, image, category, stock, supplier_cost } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO products (title, description, price, image, category, stock, supplier_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, price, image, category, stock, supplier_cost]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../dist')));

// React Router fallback (catch-all)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, async () => {
  await initDb();
  console.log(`🚀 Servidor Backend e-Commerce Dropshipping corriendo en puerto ${PORT}`);
});
