import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import HeroSection from "./components/Hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}

export default App;
