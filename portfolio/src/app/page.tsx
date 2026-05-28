import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Publications from "@/components/Publications";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Education />
      <Publications />
      <Projects />
      <Footer />
    </main>
  );
}
