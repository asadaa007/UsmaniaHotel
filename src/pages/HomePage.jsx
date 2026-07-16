import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import FeaturedMenu from '../components/FeaturedMenu';
import WhyChooseUs from '../components/WhyChooseUs';
import Reviews from '../components/Reviews';
import Gallery from '../components/Gallery';
import Location from '../components/Location';
import OrderCTA from '../components/OrderCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <FeaturedMenu />
      <WhyChooseUs />
      <Reviews />
      <Gallery />
      <Location />
      <OrderCTA />
    </main>
  );
}
