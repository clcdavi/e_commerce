import React, { useState } from 'react';
import { ShoppingBag, Search, ShieldCheck, Truck, PackageCheck, UserCheck, Menu, X, LayoutDashboard, Store } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar = ({ onOpenCart }) => {
  const { cartItemCount, activeTab, setActiveTab, searchTerm, setSearchTerm } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)'
    }}>
      {/* Top Banner de Confianza / Dropshipping */}
      <div style={{
        background: 'linear-gradient(90deg, #1e293b, #0f172a)',
        padding: '6px 16px',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Truck size={14} color="var(--accent-cyan)" /> Envíos asegurados a todo Argentina
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="var(--accent-green)" /> Cobros 100% protegidos con MercadoPago
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setActiveTab(activeTab === 'supplier' ? 'storefront' : 'supplier')}
            style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
          >
            {activeTab === 'supplier' ? '← Ir a la Tienda' : '📦 Portal Proveedores (Dropshipping)'}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('storefront')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.4rem',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)'
          }}>
            M
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px', color: '#fff', lineHeight: 1 }}>
              Mercado<span style={{ color: 'var(--accent-cyan)' }}>Drop</span>
            </h1>
            <span style={{ fontSize: '0.68rem', color: 'var(--accent-green)', fontWeight: 600 }}>
              🇦🇷 Provider Network
            </span>
          </div>
        </div>

        {/* Buscador Estilo Mercado Libre */}
        {activeTab === 'storefront' && (
          <div style={{
            flex: 1,
            maxWidth: '540px',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Buscar productos, proveedores locales, tecnología..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
            />
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        )}

        {/* Acciones del Menú */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => setActiveTab(activeTab === 'admin' ? 'storefront' : 'admin')}
            className="glass-card"
            style={{
              padding: '8px 14px',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <LayoutDashboard size={16} color="var(--accent-purple)" />
            {activeTab === 'admin' ? 'Ver Tienda' : 'Admin Dashboard'}
          </button>

          <button
            onClick={onOpenCart}
            style={{
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '10px 16px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 700,
              position: 'relative'
            }}
          >
            <ShoppingBag size={20} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.9rem' }}>Mi Carrito</span>
            {cartItemCount > 0 && (
              <span style={{
                background: 'var(--accent-cyan)',
                color: '#000',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
