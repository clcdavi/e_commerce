import React from 'react';
import { useStore } from '../context/StoreContext';
import { Store, Trash2, Tag, Plus, ExternalLink, ShoppingBag } from 'lucide-react';

export const MyShop = ({ onOpenAuth }) => {
  const { user, myShopProducts, removeProductFromMyShop, setActiveTab } = useStore();

  if (!user) {
    return (
      <div style={{ maxWidth: '700px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px 24px' }}>
          <Store size={48} color="var(--accent-cyan)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>
            Mi Tienda de Dropshipping
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            Debes iniciar sesión para publicar tus propios productos seleccionados de los proveedores y venderlos con tu propio margen.
          </p>
          <button className="btn-primary" onClick={onOpenAuth} style={{ padding: '12px 24px' }}>
            Iniciar Sesión / Registrarme
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <span className="badge badge-success" style={{ marginBottom: '6px', display: 'inline-block' }}>
            Tienda Activa
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            Mi Tienda: <span style={{ color: 'var(--accent-cyan)' }}>{user.name}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Gestiona los artículos de proveedores locales que tienes a la venta en tu catálogo personal.
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setActiveTab('storefront')}
          style={{ padding: '10px 18px', fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Agregar Productos del Catálogo General
        </button>
      </div>

      {myShopProducts.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <ShoppingBag size={40} style={{ opacity: 0.4, marginBottom: '12px' }} />
          <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>No tienes productos en tu tienda aún</h4>
          <p style={{ fontSize: '0.88rem', marginBottom: '20px' }}>
            Explora el catálogo principal de proveedores y presiona "Poner a la Venta en Mi Tienda".
          </p>
          <button className="btn-primary" onClick={() => setActiveTab('storefront')}>
            Explorar Catálogo de Proveedores
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {myShopProducts.map(product => {
            const margin = Math.round(((product.price - product.wholesalePrice) / product.price) * 100);
            const profit = product.price - product.wholesalePrice;

            return (
              <div key={product.id} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
                <img src={product.image} alt={product.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '12px' }} />
                
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '4px' }}>
                  {product.category}
                </div>
                <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{product.title}</h4>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span>Costo Mayorista:</span>
                    <span>${product.wholesalePrice.toLocaleString('es-AR')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#fff', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Precio de Venta:</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>${product.price.toLocaleString('es-AR')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 800 }}>
                    <span>Tu Ganancia por Venta:</span>
                    <span>+${profit.toLocaleString('es-AR')} ARS</span>
                  </div>
                </div>

                <button 
                  onClick={() => removeProductFromMyShop(product.id)}
                  style={{
                    marginTop: 'auto',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Trash2 size={14} /> Quitar de Mi Tienda
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
