import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Usuario Autenticado (Comprador o Admin)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('md_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Catálogo de Productos Aprobados por el Admin
  const [products, setProducts] = useState([]);

  // Fetch productos desde el backend al cargar la app
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products", err));
  }, []);

  // Carrito de Compras
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('md_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Mis Compras Realizadas (Historial del Comprador)
  const [myOrders, setMyOrders] = useState(() => {
    const saved = localStorage.getItem('md_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('storefront'); // 'storefront' | 'admin' | 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  // Persistencia
  useEffect(() => {
    if (user) localStorage.setItem('md_user', JSON.stringify(user));
    else localStorage.removeItem('md_user');
  }, [user]);



  useEffect(() => {
    localStorage.setItem('md_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('md_orders', JSON.stringify(myOrders));
  }, [myOrders]);

  // Auth Functions
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setActiveTab('storefront');
  };

  // Carrito Functions
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const addOrder = (orderData) => {
    setMyOrders(prev => [orderData, ...prev]);
  };

  // Funciones de Gestión Admin (Agregar/Eliminar Productos del Catálogo Oficial)
  const addAdminProduct = async (newProduct) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      setProducts(prev => [data, ...prev]);
    } catch (error) {
      console.error("Error adding product", error);
      alert("Error al crear el producto");
    }
  };

  const removeAdminProduct = async (productId) => {
    try {
      await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Error al eliminar el producto");
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      user,
      login,
      logout,
      products,
      cart,
      myOrders,
      addOrder,
      activeTab,
      setActiveTab,
      searchTerm,
      setSearchTerm,
      categoryFilter,
      setCategoryFilter,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartItemCount,
      addAdminProduct,
      removeAdminProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
