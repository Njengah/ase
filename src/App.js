import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./App.css";

import logo from "./assets/logo.png";

import shoe1 from "./assets/images/shoe2.png";
import shoe2 from "./assets/images/shoe6.png";
import shoe3 from "./assets/images/shoe5.png";
import { Search, ShoppingCart, User } from "lucide-react";

// Import brand logos
import filaLogo from "./assets/brands/fila.png";
import vansLogo from "./assets/brands/vans.png";
import adidasLogo from "./assets/brands/addidas.png";
import newBalanceLogo from "./assets/brands/newbalance.png";
import underArmourLogo from "./assets/brands/underarmour.png";
import reebokLogo from "./assets/brands/reebok.png";
import chanelLogo from "./assets/brands/chanel.png";
import pumaLogo from "./assets/brands/puma.png";

function App() {
  const images = [shoe1, shoe2, shoe3];

  const brands = [
    { name: "FILA", logo: filaLogo },
    { name: "VANS", logo: vansLogo },
    { name: "ADIDAS", logo: adidasLogo },
    { name: "NEW BALANCE", logo: newBalanceLogo },
    { name: "UNDER ARMOUR", logo: underArmourLogo },
    { name: "REEBOK", logo: reebokLogo },
    { name: "CHANEL", logo: chanelLogo },
    { name: "PUMA", logo: pumaLogo },
  ];

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="nav-container">
            <div className="nav-left">
              <img
                src={logo}
                alt={`${logo} logo`}
                style={{ maxHeight: "80px", width: "auto" }}
              />
            </div>

            <div className="nav-center">
              <ul className="nav-links">
                <li>
                  <Link to="/exclusive">EXCLUSIVE</Link>
                </li>
                <li>
                  <Link to="/accessories">ACCESSORIES</Link>
                </li>
                <li>
                  <Link to="/new-arrivals">NEW ARRIVALS</Link>
                </li>
                <li>
                  <Link to="/showcase">SHOWCASE</Link>
                </li>
              </ul>
            </div>

            <div className="nav-right">
              <button className="icon-button">
                <Search size={20} />
              </button>
              <button className="icon-button">
                <ShoppingCart size={20} />
                <span className="cart-badge">2</span>
              </button>
              <button className="icon-button">
                <User size={20} />
              </button>
            </div>
          </nav>
        </header>
        <main>
          <div className="slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="custom-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="slide-content">
                    <img src={image} alt={`Slide ${index}`} />
                    <div className="slide-text-overlay">
                      {index === 0 && (
                        <>
                          <h1>
                            DAYS CAN'T START
                            <br />
                            WITHOUT PERFECT SHOES
                          </h1>
                          <p>
                            Step into comfort and style with our latest
                            collection
                          </p>
                          <button className="cta-button">Shop Now</button>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <h1>
                            ELEVATE YOUR GAME
                            <br />
                            WITH EVERY STEP
                          </h1>
                          <p>
                            Discover premium footwear for your active lifestyle
                          </p>
                          <button className="cta-button">
                            Explore Collection
                          </button>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <h1>
                            WALK WITH
                            <br />
                            CONFIDENCE
                          </h1>
                          <p>
                            Find your perfect pair from our exclusive designs
                          </p>
                          <button className="cta-button">Get Yours Now</button>
                        </>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <section className="brands-section">
            <h2 className="brands-title">Trusted By Top Companies</h2>
            <div className="brands-grid">
              {brands.map((brand, index) => (
                <div key={index} className="brand-item">
                  <img src={brand.logo} alt={`${brand.name} logo`} />
                </div>
              ))}
            </div>
          </section>

          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Kiatu. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
