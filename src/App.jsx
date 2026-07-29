import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Storefront } from './components/Storefront';
import { AdminDashboard } from './components/AdminDashboard';
import { CartModal } from './components/CartModal';
import { AuthModal } from './components/AuthModal';
import { ShippingCalculator } from './components/ShippingCalculator';
import { X, ShieldCheck, Truck, ShoppingCart, Check, Star } from 'lucide-react';

const MainContent = () => {
  const { activeTab, addToCart } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} />

      <main style={{ flex: 1 }}>
        {activeTab === 'storefront' && (
          <Storefront onQuickView={(product) => setQuickViewProduct(product)} onOpenAuth={() => setIsAuthOpen(true)} />
        )}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* QuickView Modal Orientado al Comprador */}
      {quickViewProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '720px', width: '100%', padding: '32px', position: 'relative', display: 'flex', gap: '32px' }}>
            <button onClick={() => setQuickViewProduct(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            
            <img src={quickViewProduct.image} alt={quickViewProduct.title} style={{ width: '280px', height: '280px', borderRadius: '16px', objectFit: 'cover' }} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="badge badge-info" style={{ width: 'fit-content', marginBottom: '8px' }}>{quickViewProduct.category}</span>
              <h2 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>{quickViewProduct.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>{quickViewProduct.description}</p>
              
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '12px' }}>
                ${quickViewProduct.price.toLocaleString('es-AR')} ARS
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={16} color="var(--accent-green)" /> Envíos asegurados a todo el país vía MercadoPago
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); setIsCartOpen(true); }}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
                >
                  <ShoppingCart size={18} /> Agregar al Carrito & Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Footer */}
      <footer style={{
        background: '#070a12',
        borderTop: '1px solid var(--border-glass)',
        padding: '40px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <p style={{ marginBottom: '8px' }}>MercadoDrop Argentina © 2026 - Tienda Oficial e-Commerce</p>
        <p style={{ fontSize: '0.78rem' }}>Infraestructura Oracle Cloud VPS con Docker & Procesamiento Seguro de MercadoPago SDK</p>
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
