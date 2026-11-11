import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Vlog from "./sections/Vlog";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <main id="main">
        <Home />
        <Navbar />
        <About />
        <Skills />
        <Projects />
        <Vlog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
