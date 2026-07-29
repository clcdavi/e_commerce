import React, { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useGoogleLogin } from '@react-oauth/google';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());
        
        const isAdmin = userInfo.email.toLowerCase().includes('admin') || userInfo.email.toLowerCase() === 'admin@mercadodrop.com.ar';
        
        const googleUser = {
          id: `usr-google-${userInfo.sub}`,
          name: userInfo.name || userInfo.email.split('@')[0],
          email: userInfo.email,
          role: isAdmin ? 'admin' : 'buyer',
          avatar: userInfo.picture
        };
        
        login(googleUser);
        onClose();
      } catch (error) {
        console.error("Error fetching Google User Info", error);
        alert("Error al iniciar sesión con Google");
      }
    },
    onError: errorResponse => {
      console.error(errorResponse);
      alert("Error al iniciar sesión con Google");
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAdmin = formData.email.toLowerCase().includes('admin') || formData.email.toLowerCase() === 'admin@mercadodrop.com.ar';
    
    const userPayload = {
      id: `usr-${Date.now()}`,
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      role: isAdmin ? 'admin' : 'buyer',
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
          {/* Botón de Autenticación con Google / Gmail */}
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '8px',
              background: '#ffffff',
              color: '#1f2937',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continuar con Google (Gmail)
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '6px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>o con tu correo</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          </div>
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
