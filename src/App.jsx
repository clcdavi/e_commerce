import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Storefront } from './components/Storefront';
import { SupplierPortal } from './components/SupplierPortal';
import { CartModal } from './components/CartModal';
import { X, ShieldCheck, Truck, ShoppingCart, Check, Star } from 'lucide-react';

const AdminDashboard = () => {
  const { products } = useStore();
  const totalSales = 452800; // Simulación ventas mes
  const totalOrders = 14;

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '24px' }}>
        Panel Administrador de la Tienda
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ventas Acumuladas</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '4px' }}>
            ${totalSales.toLocaleString('es-AR')} ARS
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Órdenes de Dropshipping</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '4px' }}>
            {totalOrders} Pedidos
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Integración MercadoPago</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="var(--accent-mp)" /> Webhook Activo
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, marginBottom: '16px' }}>
          Inventario y Proveedores Sincronizados
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Producto</th>
              <th style={{ padding: '12px' }}>Proveedor</th>
              <th style={{ padding: '12px' }}>Costo Mayorista</th>
              <th style={{ padding: '12px' }}>PVP Sugerido</th>
              <th style={{ padding: '12px' }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>{p.title}</td>
                <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{p.supplier.name}</td>
                <td style={{ padding: '12px' }}>${p.wholesalePrice.toLocaleString('es-AR')}</td>
                <td style={{ padding: '12px', color: 'var(--accent-cyan)', fontWeight: 700 }}>${p.price.toLocaleString('es-AR')}</td>
                <td style={{ padding: '12px' }}>
                  <span className="badge badge-info">{p.stock} u.</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MainContent = () => {
  const { activeTab, addToCart } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <main style={{ flex: 1 }}>
        {activeTab === 'storefront' && (
          <Storefront onQuickView={(product) => setQuickViewProduct(product)} />
        )}
        {activeTab === 'supplier' && <SupplierPortal />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Modal de Detalle de Producto / QuickView */}
      {quickViewProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '750px', width: '100%', padding: '32px', position: 'relative', display: 'flex', gap: '32px' }}>
            <button onClick={() => setQuickViewProduct(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            
            <img src={quickViewProduct.image} alt={quickViewProduct.title} style={{ width: '300px', height: '300px', borderRadius: '16px', objectFit: 'cover' }} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="badge badge-info" style={{ width: 'fit-content', marginBottom: '8px' }}>{quickViewProduct.category}</span>
              <h2 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800, marginBottom: '12px' }}>{quickViewProduct.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>{quickViewProduct.description}</p>
              
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '20px' }}>
                ${quickViewProduct.price.toLocaleString('es-AR')} ARS
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); setIsCartOpen(true); }}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: '14px' }}
                >
                  <ShoppingCart size={18} /> Comprar Ahora con MercadoPago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer Profesional */}
      <footer style={{
        background: '#070a12',
        borderTop: '1px solid var(--border-glass)',
        padding: '40px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <p style={{ marginBottom: '8px' }}>MercadoDrop Argentina © 2026 - Plataforma de Dropshipping Local & e-Commerce Integrado</p>
        <p style={{ fontSize: '0.78rem' }}>Infraestructura en Oracle Cloud VPS con Docker & Procesamiento Seguro de MercadoPago SDK</p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
