import Image from "next/image";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Skills from "./pages/Skills";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="">
      <Home />
      <Navbar />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
