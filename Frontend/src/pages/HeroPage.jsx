import NavBarPage from "./NavBarPage";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

const HeroPage = () => {
  return (
    <>
      <NavBarPage/>
      <Hero />
      <Features />
      <AboutUs/>
      <Footer />
    </>
  );
};

export default HeroPage;
