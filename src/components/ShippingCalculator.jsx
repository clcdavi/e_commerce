import React, { useState } from 'react';
import { Truck, ShieldCheck, Calculator, PackageCheck, MapPin, ArrowRight } from 'lucide-react';
import { PROVINCES_ARGENTINA } from '../data/mockData';

export const ShippingCalculator = ({ wholesalePrice, suggestedPrice }) => {
  const [province, setProvince] = useState('Buenos Aires');
  const [courier, setCourier] = useState('andreani');
  const [weight, setWeight] = useState(1); // kg

  // Tarifas estimadas por zona / courier en ARS
  const calculateShipping = () => {
    let baseRate = 3200;
    if (province.includes('CABA') || province === 'Buenos Aires') baseRate = 2400;
    if (['Córdoba', 'Santa Fe', 'Entre Ríos'].includes(province)) baseRate = 3100;
    if (['Tierra del Fuego', 'Santa Cruz', 'Jujuy'].includes(province)) baseRate = 4800;

    const courierMultiplier = courier === 'andreani' ? 1.15 : courier === 'oca' ? 1.1 : 1.0;
    const finalRate = Math.round((baseRate + (weight - 1) * 600) * courierMultiplier);
    return finalRate;
  };

  const shippingCost = calculateShipping();
  const grossProfit = suggestedPrice - wholesalePrice;
  const netProfit = grossProfit - 0; // Margen antes de comisión MercadoPago
  const mpFee = Math.round(suggestedPrice * 0.0639); // 6.39% comisión promedio MercadoPago

  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '24px' }}>
      <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Calculator color="var(--accent-cyan)" size={20} /> Simulación Logística & Calculadora de Rentabilidad ARS
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Provincia Destino</label>
          <select value={province} onChange={(e) => setProvince(e.target.value)} style={selectStyle}>
            {PROVINCES_ARGENTINA.map(p => (
              <option key={p} value={p} style={{ background: '#0f172a' }}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Correo de Despacho</label>
          <select value={courier} onChange={(e) => setCourier(e.target.value)} style={selectStyle}>
            <option value="andreani" style={{ background: '#0f172a' }}>Andreani (Entrega 24-48hs)</option>
            <option value="oca" style={{ background: '#0f172a' }}>OCA Express</option>
            <option value="correo_arg" style={{ background: '#0f172a' }}>Correo Argentino Paq.ar</option>
          </select>
        </div>
      </div>

      {/* Desglose de Números de Dropshipping */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Costo Envío Estimado</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
            ${shippingCost.toLocaleString('es-AR')} ARS
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Comisión MercadoPago (6.39%)</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            -${mpFee.toLocaleString('es-AR')} ARS
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ganancia Neta por Venta</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-green)' }}>
            +${(grossProfit - mpFee).toLocaleString('es-AR')} ARS
          </div>
        </div>
      </div>
    </div>
  );
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--border-glass)',
  color: '#fff',
  fontSize: '0.88rem',
  outline: 'none'
};
