import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { TechStack } from "@/components/tech-stack";
import { BusinessInfo } from "@/components/business-info";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Services />
      <TechStack />
      <BusinessInfo />
      <Contact />
      <Footer />
    </main>
  );
}
