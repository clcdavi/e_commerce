import React, { useState } from 'react';
import { Mail, Check, Gift } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="glass-panel" style={{
      margin: '60px 0',
      padding: '40px',
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '32px',
      flexWrap: 'wrap'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
          <Gift size={16} /> Club de Descuentos Exclusivos
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          Recibe $5.000 de Regalo en tu Primera Compra
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Suscríbete a nuestro boletín semanal de ofertas relámpago y cupones de descuento especiales para Argentina.
        </p>
      </div>

      <div style={{ flex: 1, maxWidth: '420px', minWidth: '280px' }}>
        {subscribed ? (
          <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-green)', borderRadius: '12px', color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Check color="var(--accent-green)" size={20} /> ¡Gracias por suscribirte! Te enviamos tu cupón al correo.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="email" 
              required
              placeholder="Ingresa tu email aquí..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 20px', flexShrink: 0 }}>
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
