import { useState } from "react";
import LandingAsk from "@/components/valentine/LandingAsk";
import Confetti from "@/components/valentine/Confetti";
import ProfileCard from "@/components/valentine/ProfileCard";
import LoveMetrics from "@/components/valentine/LoveMetrics";
import BucketListTickets from "@/components/valentine/BucketListTickets";
import DreamBoard from "@/components/valentine/DreamBoard";
import GiftReveal from "@/components/valentine/GiftReveal";
import BrandIdentityGift from "@/components/valentine/BrandIdentityGift";
import FooterLetter from "@/components/valentine/FooterLetter";
import MusicPlayer from "@/components/valentine/MusicPlayer";
import EasterEggs from "@/components/valentine/EasterEggs";

const Index = () => {
  const [saidYes, setSaidYes] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleYes = () => {
    setShowConfetti(true);
    setSaidYes(true);
    setTimeout(() => {
      document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Confetti active={showConfetti} />
      <EasterEggs />

      {/* Phase 1: The Ask */}
      <LandingAsk onYes={handleYes} />

      {/* Phase 2: The Experience */}
      {saidYes && (
        <div id="main-content" className="animate-fade-in">
          <ProfileCard />
          <div className="w-24 h-px bg-secondary/30 mx-auto" />
          <LoveMetrics />
          <div className="w-24 h-px bg-secondary/30 mx-auto" />
          <BucketListTickets />
          <div className="w-24 h-px bg-secondary/30 mx-auto" />
          <DreamBoard />
          <div className="w-24 h-px bg-secondary/30 mx-auto" />
          <GiftReveal />
          <div className="w-24 h-px bg-secondary/30 mx-auto" />
          <BrandIdentityGift />
          <div className="w-24 h-px bg-secondary/30 mx-auto" />
          <FooterLetter />
        </div>
      )}

      {saidYes && <MusicPlayer />}
    </div>
  );
};

export default Index;
