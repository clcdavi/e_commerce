import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Package, Plus, Trash2, DollarSign, Store, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminDashboard = () => {
  const { products, addAdminProduct, removeAdminProduct } = useStore();
  const [successMsg, setSuccessMsg] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Electrónica',
    price: '',
    wholesalePrice: '',
    stock: '',
    image: '',
    supplierName: 'TechImport Argentina',
    dispatchTime: '24 hs',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const priceNum = Number(form.price);
    const wholesaleNum = Number(form.wholesalePrice) || Math.round(priceNum * 0.65);

    const newProd = {
      id: `prod-${Date.now()}`,
      title: form.title,
      description: form.description || 'Producto verificado y aprobado oficialmente en catálogo.',
      price: priceNum,
      wholesalePrice: wholesaleNum,
      category: form.category,
      image: form.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
      stock: Number(form.stock) || 20,
      supplier: {
        id: `supp-${Date.now()}`,
        name: form.supplierName,
        location: 'Buenos Aires',
        dispatchTime: form.dispatchTime,
        rating: 5.0
      }
    };

    addAdminProduct(newProd);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);

    setForm({
      title: '',
      category: 'Electrónica',
      price: '',
      wholesalePrice: '',
      stock: '',
      image: '',
      supplierName: 'TechImport Argentina',
      dispatchTime: '24 hs',
      description: ''
    });
  };

  return (
    <div style={{ maxWidth: '1150px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-info" style={{ marginBottom: '8px', display: 'inline-block' }}>
          Gestión Exclusiva de Administrador
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
          Panel Admin: Control de Productos Aprobados
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Agrega nuevos productos autorizados de proveedores de dropshipping para que estén a la venta directamente a los compradores en la tienda.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
        {/* Formulario de Carga Directa por Admin */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 800, marginBottom: '20px' }}>
            Aprobar y Agregar Producto a la Tienda
          </h3>

          {successMsg && (
            <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-green)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 color="var(--accent-green)" /> Producto aprobado y publicado inmediatamente para los compradores.
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
                </select>
              </div>

              <div>
                <label style={labelStyle}>Stock Inicial</label>
                <input type="number" required placeholder="Cantidad" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Precio de Venta al Comprador ($ ARS)</label>
                <input type="number" required placeholder="$ ARS" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Costo Mayorista ($ ARS)</label>
                <input type="number" placeholder="$ ARS" value={form.wholesalePrice} onChange={(e) => setForm({ ...form, wholesalePrice: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>URL de la Imagen</label>
              <input type="url" placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Proveedor de Dropshipping Asociado</label>
              <input type="text" placeholder="Ej. TechImport S.R.L." value={form.supplierName} onChange={(e) => setForm({ ...form, supplierName: e.target.value })} style={inputStyle} />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '12px', justifyContent: 'center', padding: '14px' }}>
              <Plus size={18} /> Publicar Producto en la Tienda Oficial
            </button>
          </form>
        </div>

        {/* Lista de Productos Aprobados */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 800, marginBottom: '16px' }}>
            Catálogo Actual de la Tienda ({products.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '560px', overflowY: 'auto' }}>
            {products.map(product => (
              <div key={product.id} className="glass-card" style={{ padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={product.image} alt={product.title} style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 700 }}>{product.title}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    ${product.price.toLocaleString('es-AR')} ARS
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Proveedor: {product.supplier?.name} | Stock: {product.stock} u.
                  </div>
                </div>

                <button 
                  onClick={() => removeAdminProduct(product.id)}
                  title="Eliminar de la Tienda"
                  style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontSize: '0.88rem', outline: 'none' };
const optStyle = { background: '#0f172a' };
