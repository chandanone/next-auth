import { Container } from "@/components/container";
import { FintaNavbar } from "@/components/Finta-Navbar";
import { Hero } from "@/components/hero";
import Image from "next/image";
import heroImage from '../../public/hero-ui-v5.webp'; 

export default function Home() {
  return (
    <div className="layout">
      <div className="layouts-line-container">
        <div className="left-line" />
        <div className="right-line" />
      </div>
      <Container>        
        <FintaNavbar />
        <Hero />
      </Container>
      <div className="hero-image-container">
        <div className="horizontal-line" />
            <Image
              src={heroImage}
              width={500}
              height={500}
              alt="Picture of the author"
              className="hero-image"
              priority
            />
        </div>
    </div>
  );
}