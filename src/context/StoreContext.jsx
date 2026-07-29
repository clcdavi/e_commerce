import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Estado de Usuario Autenticado
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('md_user');
    return saved ? JSON.parse(saved) : null; // null | { id, name, email, role: 'buyer' | 'seller' | 'admin' }
  });

  // Lista global de productos
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('md_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Productos agregados por el Comprador a SU propia tienda para revender (Dropshipping)
  const [myShopProducts, setMyShopProducts] = useState(() => {
    const saved = localStorage.getItem('md_myshop');
    return saved ? JSON.parse(saved) : [];
  });

  // Carrito de compras
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('md_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Mis compras realizadas (Historial del comprador)
  const [myOrders, setMyOrders] = useState(() => {
    const saved = localStorage.getItem('md_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('storefront'); // 'storefront' | 'myshop' | 'supplier' | 'orders'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  // Persistencia
  useEffect(() => {
    if (user) localStorage.setItem('md_user', JSON.stringify(user));
    else localStorage.removeItem('md_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('md_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('md_myshop', JSON.stringify(myShopProducts));
  }, [myShopProducts]);

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

  // Dropshipping: Agregar producto de proveedor a Mi Tienda
  const addProductToMyShop = (product) => {
    if (!myShopProducts.some(p => p.id === product.id)) {
      setMyShopProducts(prev => [...prev, product]);
    }
  };

  const removeProductFromMyShop = (productId) => {
    setMyShopProducts(prev => prev.filter(p => p.id !== productId));
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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <StoreContext.Provider value={{
      user,
      login,
      logout,
      products,
      myShopProducts,
      addProductToMyShop,
      removeProductFromMyShop,
      cart,
      myOrders,
      addOrder,
      activeTab,
      setActiveTab,
      selectedProduct,
      setSelectedProduct,
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
      addProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
