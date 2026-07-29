import React from 'react';
import { Truck, ShieldCheck, CreditCard, RefreshCw, Headphones, Award, Star } from 'lucide-react';

export const TrustSection = () => {
  const guarantees = [
    {
      icon: <Truck size={28} color="var(--accent-cyan)" />,
      title: 'Envíos Rápidos a Todo el País',
      desc: 'Despachos garantizados en 24 a 48hs con Andreani, OCA y Correo Argentino.'
    },
    {
      icon: <CreditCard size={28} color="var(--accent-green)" />,
      title: 'Hasta 6 Cuotas Sin Interés',
      desc: 'Procesamiento directo y seguro a través de MercadoPago Argentina.'
    },
    {
      icon: <ShieldCheck size={28} color="var(--accent-blue)" />,
      title: 'Garantía Oficial de Fábrica',
      desc: 'Todos nuestros productos cuentan con garantía directa y cambio sin cargo.'
    },
    {
      icon: <Headphones size={28} color="var(--accent-purple)" />,
      title: 'Soporte 24/7 en Español',
      desc: 'Atención personalizada ante cualquier consulta sobre tu compra o envío.'
    }
  ];

  return (
    <section style={{ margin: '48px 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {guarantees.map((g, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {g.icon}
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>
                {g.title}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                {g.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
