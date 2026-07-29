import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// En Docker, usamos DATABASE_URL. En local, configuramos uno por defecto.
const connectionString = process.env.DATABASE_URL || 'postgresql://mercadodrop_user:SecretPasswordArg2026!@localhost:5432/mercadodrop_db';

export const pool = new Pool({
  connectionString,
});

export const initDb = async () => {
  try {
    console.log('Conectando a PostgreSQL para inicializar tablas...');
    
    // Tabla Usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) DEFAULT 'buyer',
        avatar VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla Productos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        category VARCHAR(100),
        stock INTEGER DEFAULT 0,
        supplier_cost DECIMAL(10, 2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla Órdenes
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id),
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        items JSONB NOT NULL,
        payment_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Tablas inicializadas correctamente en PostgreSQL');

    // Insertar productos de prueba si no hay ninguno
    const { rows } = await pool.query('SELECT COUNT(*) as count FROM products');
    if (parseInt(rows[0].count) === 0) {
      console.log('📦 Insertando productos iniciales...');
      const sampleProducts = [
        ['Auriculares Inalámbricos Pro', 'Auriculares con cancelación de ruido activa.', 45000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', 'Electrónica', 50, 25000],
        ['Reloj Inteligente FitTrack', 'Monitor de ritmo cardíaco y GPS integrado.', 32000, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', 'Electrónica', 30, 18000],
        ['Mochila Antirrobo Urbana', 'Resistente al agua con puerto USB.', 28000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', 'Moda y Equipaje', 100, 12000],
        ['Cafetera Espresso Automática', 'Prepara el mejor café en casa.', 85000, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80', 'Hogar y Cocina', 15, 50000]
      ];

      for (const p of sampleProducts) {
        await pool.query(
          'INSERT INTO products (title, description, price, image, category, stock, supplier_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          p
        );
      }
      console.log('✅ Productos iniciales insertados');
    }

  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
  }
};
