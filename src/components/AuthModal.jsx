import React, { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de login/registro exitoso
    const userPayload = {
      id: `usr-${Date.now()}`,
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
    };

    login(userPayload);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div className="glass-panel" style={{ maxWidth: '440px', width: '100%', padding: '32px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
            margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <User size={24} color="#fff" />
          </div>
          <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>
            {isRegister ? 'Crear Cuenta en MercadoDrop' : 'Iniciar Sesión'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            {isRegister ? 'Regístrate para comprar y crear tu propia tienda de Dropshipping' : 'Ingresa a tu cuenta para gestionar tus compras y productos'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister && (
            <div>
              <label style={labelStyle}>Nombre Completo</label>
              <div style={{ position: 'relative' }}>
                <input type="text" required placeholder="Tu nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
                <User size={16} color="var(--text-muted)" style={iconStyle} />
              </div>
            </div>
          )}

          <div>
            <label style={labelStyle}>Correo Electrónico</label>
            <div style={{ position: 'relative' }}>
              <input type="email" required placeholder="tu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
              <Mail size={16} color="var(--text-muted)" style={iconStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input type="password" required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={inputStyle} />
              <Lock size={16} color="var(--text-muted)" style={iconStyle} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px', fontSize: '0.95rem' }}>
            {isRegister ? 'Registrarme' : 'Ingresar'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta aún?'}{' '}
          <button onClick={() => setIsRegister(!isRegister)} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 700, cursor: 'pointer' }}>
            {isRegister ? 'Iniciar Sesión' : 'Registrarme gratis'}
          </button>
        </div>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 };
const inputStyle = { width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontSize: '0.9rem', outline: 'none' };
const iconStyle = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' };
