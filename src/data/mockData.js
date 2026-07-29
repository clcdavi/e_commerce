// Mock Data de productos con proveedores de dropshipping locales (Argentina)
export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Auriculares Inalámbricos Pro ANC Hifi',
    description: 'Cancelación activa de ruido, 30h de batería, sonido Hi-Res espacial. Proveedor local directo con envío en 24h a CABA/GBA.',
    price: 45999,
    wholesalePrice: 28500,
    category: 'Electrónica',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    stock: 45,
    supplier: {
      id: 'supp-1',
      name: 'TechImport Arg S.R.L.',
      location: 'Distrito Tecnológico (CABA)',
      dispatchTime: '24 hs',
      rating: 4.9
    },
    specs: ['Bluetooth 5.3', 'Cancelación de Ruido -35dB', 'Carga Inalámbrica QI']
  },
  {
    id: 'prod-2',
    title: 'Smartwatch Ultra AMOLED Titanium 49mm',
    description: 'Caja de titanio aeronáutico, GPS autónomo, monitor de salud continuo 24/7 y llamadas Bluetooth.',
    price: 78990,
    wholesalePrice: 49000,
    category: 'Electrónica',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    stock: 28,
    supplier: {
      id: 'supp-1',
      name: 'TechImport Arg S.R.L.',
      location: 'Distrito Tecnológico (CABA)',
      dispatchTime: '24 hs',
      rating: 4.9
    },
    specs: ['Pantalla 2.02" AMOLED 1000 nits', 'Batería de 7 días', 'Resistente al agua IP68']
  },
  {
    id: 'prod-3',
    title: 'Cafetera Espresso Premium Italian Style 15 Bar',
    description: 'Bomba de presión italiana de 15 bares, vaporizador para leche cremosa y cuerpo de acero inoxidable pulido.',
    price: 125000,
    wholesalePrice: 82000,
    category: 'Hogar y Cocina',
    image: 'https://images.unsplash.com/photo-1517668808822-9eaa03afd2af?w=800&q=80',
    stock: 12,
    supplier: {
      id: 'supp-2',
      name: 'Bazar Central Dropshipping',
      location: 'Rosario (Santa Fe)',
      dispatchTime: '48 hs',
      rating: 4.8
    },
    specs: ['Bomba Ulka 15 Bar', 'Manómetro de presión', 'Tanque 1.5 Litros']
  },
  {
    id: 'prod-4',
    title: 'Mochila Impermeable Anti-robo Ergonómica',
    description: 'Puerto de carga USB externo, compartimento acolchado para Laptop de 15.6" y tela oxford impermeable.',
    price: 34999,
    wholesalePrice: 19500,
    category: 'Moda y Equipaje',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    stock: 65,
    supplier: {
      id: 'supp-3',
      name: 'Textil & Marroquinería Express',
      location: 'Córdoba Capital',
      dispatchTime: '24-48 hs',
      rating: 4.7
    },
    specs: ['Puerto USB 3.0', 'Bolsillo Oculto Anti-Robo', 'Cierres YKK']
  }
];

export const PROVINCES_ARGENTINA = [
  'Buenos Aires',
  'Ciudad Autónoma de Buenos Aires (CABA)',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán'
];
