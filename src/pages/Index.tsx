import { useState, useEffect } from 'react';
import HexagonBackground from '@/components/HexagonBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GetStartedTransition from '@/components/GetStartedTransition';
import HowItWorksSection from '@/components/HowItWorksSection';
import WhyUsSection from '@/components/WhyUsSection';
import Footer from '@/components/Footer';
import LiquidSection from '@/components/LiquidSection';
import StickyCopyright from '@/components/StickyCopyright';
import HexagonFloor from '@/components/HexagonFloor';
import SplashScreen from '@/components/SplashScreen';
import VisitorProfileFlow from '@/components/VisitorProfileFlow';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showVisitorFlow, setShowVisitorFlow] = useState(false);

  useEffect(() => {
    (window as any).__openVisitorFlow = () => setShowVisitorFlow(true);
    return () => { delete (window as any).__openVisitorFlow; };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen isLoading={isLoading} />
      <VisitorProfileFlow isOpen={showVisitorFlow} onClose={() => setShowVisitorFlow(false)} />
      
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        <HexagonBackground />
        <Navigation />
        
        <main className="relative z-10">
          <HeroSection />
          <GetStartedTransition />
          
          <div className="relative">
            <HexagonFloor />
            <LiquidSection>
              <HowItWorksSection />
            </LiquidSection>
            <LiquidSection>
              <WhyUsSection />
            </LiquidSection>
          </div>
        </main>

        <Footer />
        <StickyCopyright />
      </div>
    </>
  );
};

export default Index;
