import React, { useState } from 'react';
import { ShoppingCart, Eye, Star, Truck, ShieldCheck, Tag, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product, onQuickView, onOpenAuth }) => {
  const { addToCart, addProductToMyShop, myShopProducts, user } = useStore();
  const [added, setAdded] = useState(false);
  const [addedToShop, setAddedToShop] = useState(false);

  const isAlreadyInShop = myShopProducts.some(p => p.id === product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const margin = Math.round(((product.price - product.wholesalePrice) / product.price) * 100);

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
      {/* Badge de Dropshipping / Margen */}
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
          Ganancia ~{margin}%
        </span>
        <span className="badge badge-info">
          🇦🇷 Stock Local
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

      {/* Contenido */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
          <span>{product.category}</span>
          <span style={{ color: 'var(--accent-cyan)' }}>⭐ {product.supplier.rating}</span>
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
          Despacho: <strong style={{ color: '#fff' }}>{product.supplier.dispatchTime}</strong> ({product.supplier.location})
        </div>

        {/* Precios */}
        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              ${product.price.toLocaleString('es-AR')}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ARS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleAdd}
                style={{
                  flex: 1,
                  background: added ? 'var(--accent-green)' : 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                  color: '#fff',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                {added ? '¡Agregado!' : 'Comprar'}
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-glass)',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                title="Vista Rápida"
              >
                <Eye size={16} color="var(--text-muted)" />
              </button>
            </div>

            {/* Botón de Vender en Mi Tienda (Dropshipping) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!user) {
                  if (onOpenAuth) onOpenAuth();
                } else {
                  addProductToMyShop(product);
                  setAddedToShop(true);
                  setTimeout(() => setAddedToShop(false), 2000);
                }
              }}
              style={{
                width: '100%',
                background: isAlreadyInShop || addedToShop ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: isAlreadyInShop || addedToShop ? '1px solid var(--accent-green)' : '1px solid var(--border-glass)',
                color: isAlreadyInShop || addedToShop ? 'var(--accent-green)' : 'var(--text-main)',
                padding: '8px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Tag size={13} color={isAlreadyInShop || addedToShop ? 'var(--accent-green)' : 'var(--accent-cyan)'} />
              {isAlreadyInShop ? '✓ En Mi Tienda' : addedToShop ? '¡Añadido a Mi Tienda!' : '+ Vender en Mi Tienda'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
