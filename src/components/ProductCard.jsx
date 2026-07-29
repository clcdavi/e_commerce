import React, { useState } from 'react';
import { ShoppingCart, Eye, Truck, ShieldCheck, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div 
      className="glass-card" 
      onClick={() => onQuickView(product)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* Badges de Confianza para el Comprador */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 2,
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap'
      }}>
        <span className="badge badge-success">
          Garantía Oficial
        </span>
        <span className="badge badge-info">
          🇦🇷 Envío Nacional 24/48h
        </span>
      </div>

      {/* Imagen */}
      <div style={{
        width: '100%',
        height: '220px',
        overflow: 'hidden',
        position: 'relative',
        background: '#0d1322'
      }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>

      {/* Contenido Orientado 100% al Comprador */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
          <span>{product.category}</span>
          <span style={{ color: 'var(--accent-cyan)' }}>⭐ {product.supplier?.rating || 4.9}</span>
        </div>

        <h3 style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '8px',
          lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.6rem'
        }}>
          {product.title}
        </h3>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Truck size={14} color="var(--accent-green)" />
          Despacho Inmediato a todo el país
        </div>

        {/* Precios y Botón de Compra */}
        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              ${product.price.toLocaleString('es-AR')}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ARS</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleAdd}
              style={{
                flex: 1,
                background: added ? 'var(--accent-green)' : 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
              {added ? '¡Agregado!' : 'Agregar al Carrito'}
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Vista Rápida"
            >
              <Eye size={18} color="var(--text-muted)" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
