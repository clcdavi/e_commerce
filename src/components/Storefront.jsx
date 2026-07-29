import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Truck, ShieldCheck, Zap, ArrowRight, Star, RefreshCw } from 'lucide-react';

export const Storefront = ({ onQuickView }) => {
  const { products, searchTerm, categoryFilter, setCategoryFilter } = useStore();

  const categories = ['Todas', 'Electrónica', 'Hogar y Cocina', 'Moda y Equipaje'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todas' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
      {/* HERO SECTION DE IMPACTO VISUAL */}
      <section style={{
        marginTop: '24px',
        marginBottom: '48px',
        padding: '60px 40px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
        border: '1px solid var(--border-glass)',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px'
      }}>
        <div style={{ maxWidth: '640px', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', color: 'var(--accent-cyan)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '20px' }}>
            <Zap size={14} /> Red Dropshipping Directa Argentina
          </div>

          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: '20px', letterSpacing: '-1px' }}>
            Vende en todo el país <br />
            <span style={{ background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              sin costo de inventario
            </span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
            Conectamos tiendas online con los principales proveedores e importadores locales. Despachos rápidos en 24/48hs a través de Andreani, OCA y Correo Argentino.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary" 
              onClick={() => {
                const el = document.getElementById('catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              Explorar Catálogo Nacional <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Banner Ilustrativo de MercadoPago & Envíos */}
        <div style={{
          width: '380px',
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 158, 227, 0.15)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <ShieldCheck color="var(--accent-mp)" size={28} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Pagos Seguros MercadoPago</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Checkout Pro y Cobros con tarjeta de crédito en cuotas.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <Truck color="var(--accent-green)" size={28} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Logística Integrada</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Seguimiento en vivo para el cliente final.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO DE PRODUCTOS */}
      <section id="catalog">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Catálogo de Productos</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Productos con stock en depósito listos para enviar</p>
          </div>

          {/* Filtros por Categoría */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-glass)',
                  background: categoryFilter === cat ? 'var(--accent-blue)' : 'rgba(255,255,255,0.04)',
                  color: categoryFilter === cat ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            No se encontraron productos que coincidan con la búsqueda.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
