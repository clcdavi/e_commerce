import React, { useState } from 'react';
import { Package, Plus, DollarSign, Store, Truck, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SupplierPortal = () => {
  const { addProduct, products } = useStore();
  const [successMsg, setSuccessMsg] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Electrónica',
    price: '',
    wholesalePrice: '',
    stock: '',
    image: '',
    supplierName: 'Distribuidora Mayorista Arg',
    location: 'Buenos Aires (GBA Norte)',
    dispatchTime: '24 hs',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const priceNum = Number(form.price);
    const wholesaleNum = Number(form.wholesalePrice);

    const newProd = {
      id: `prod-${Date.now()}`,
      title: form.title,
      description: form.description || 'Producto publicado directamente por proveedor nacional verified.',
      price: priceNum,
      wholesalePrice: wholesaleNum,
      category: form.category,
      image: form.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
      stock: Number(form.stock) || 10,
      supplier: {
        id: `supp-${Date.now()}`,
        name: form.supplierName,
        location: form.location,
        dispatchTime: form.dispatchTime,
        rating: 5.0
      },
      specs: ['Garantía de Fábrica 6 Meses', 'Factura A/B disponible']
    };

    addProduct(newProd);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);

    setForm({
      title: '',
      category: 'Electrónica',
      price: '',
      wholesalePrice: '',
      stock: '',
      image: '',
      supplierName: form.supplierName,
      location: form.location,
      dispatchTime: '24 hs',
      description: ''
    });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <span className="badge badge-info" style={{ marginBottom: '10px', display: 'inline-block' }}>
          Network Dropshipping Argentina
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
          Portal de Proveedores Directos
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '8px auto' }}>
          Publica tus productos mayoristas. Los revendedores y tiendas sincronizarán tu stock en tiempo real y venderán en todo el país.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
        {/* Banner informativo del modelo */}
        <div className="glass-panel" style={{ padding: '28px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp color="var(--accent-cyan)" /> Ventajas para Proveedores
          </h3>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 color="var(--accent-green)" size={20} style={{ flexShrink: 0 }} />
              <div><strong style={{ color: '#fff' }}>Cobro Inmediato:</strong> Los pagos ingresan directamente a MercadoPago al momento de la venta.</div>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 color="var(--accent-green)" size={20} style={{ flexShrink: 0 }} />
              <div><strong style={{ color: '#fff' }}>Logística Automatizada:</strong> Recibe la etiqueta lista para pegar en la encomienda.</div>
            </li>
            <li style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 color="var(--accent-green)" size={20} style={{ flexShrink: 0 }} />
              <div><strong style={{ color: '#fff' }}>Sin Costo Fijo:</strong> Solo pagas por cada pedido despachado con éxito.</div>
            </li>
          </ul>

          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>
              📦 Productos Sincronizados
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {products.length} Publicaciones Activas
            </div>
          </div>
        </div>

        {/* Formulario de Carga */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 800, marginBottom: '20px' }}>
            Publicar Nuevo Producto en la Red Dropshipping
          </h3>

          {successMsg && (
            <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-green)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 color="var(--accent-green)" /> Producto publicado exitosamente en el catálogo nacional.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Título del Producto</label>
              <input type="text" required placeholder="Ej. Smartwatch Ultra AMOLED 49mm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Categoría</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                  <option value="Electrónica" style={optStyle}>Electrónica</option>
                  <option value="Hogar y Cocina" style={optStyle}>Hogar y Cocina</option>
                  <option value="Moda y Equipaje" style={optStyle}>Moda y Equipaje</option>
                  <option value="Herramientas" style={optStyle}>Herramientas</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Stock Disponible</label>
                <input type="number" required placeholder="Cantidad de unidades" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Costo Mayorista (Tu Precio)</label>
                <input type="number" required placeholder="$ ARS" value={form.wholesalePrice} onChange={(e) => setForm({ ...form, wholesalePrice: e.target.value })} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Precio Sugerido Venta al Público</label>
                <input type="number" required placeholder="$ ARS" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>URL de la Imagen (Opcional)</label>
              <input type="url" placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Nombre de tu Empresa / Depósito</label>
              <input type="text" required placeholder="Ej. Distribuidora Central SRL" value={form.supplierName} onChange={(e) => setForm({ ...form, supplierName: e.target.value })} style={inputStyle} />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '12px', justifyContent: 'center', padding: '14px' }}>
              <Plus size={18} /> Publicar Producto en el Catálogo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontSize: '0.9rem', outline: 'none' };
const optStyle = { background: '#0f172a' };
