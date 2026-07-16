import { Outlet } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import ScrollProgress from './ScrollProgress';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import CartButton from './cart/CartButton';
import CartDrawer from './cart/CartDrawer';
import AddToCartToast from './cart/AddToCartToast';

export default function SiteLayout() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingButtons />
      <CartButton />
      <CartDrawer />
      <AddToCartToast />
    </>
  );
}
