import NavBarPage from "./NavBarPage";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Footer from "../components/Footer";

const HeroPage = () => {
  return (
    <>
      <NavBarPage/>
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default HeroPage;
