import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { MenuStoreProvider } from './lib/menuStore';
import { AddonsProvider } from './lib/addonsStore';
import { SiteContentProvider } from './lib/siteContentStore';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/admin/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <SiteContentProvider>
          <MenuStoreProvider>
            <AddonsProvider>
            <CartProvider>
              <Routes>
                <Route path="/management" element={<AdminPage />} />
                <Route element={<SiteLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                </Route>
              </Routes>
            </CartProvider>
            </AddonsProvider>
          </MenuStoreProvider>
        </SiteContentProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}
