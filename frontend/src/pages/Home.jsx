import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import Courses from "../components/Courses.jsx";
import Videos from "../components/Videos.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SocialLinks />
      <Courses />
      <Videos />
      <Contact />
      <Footer />
    </div>
  );
}