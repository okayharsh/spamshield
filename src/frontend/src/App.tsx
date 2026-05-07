import Nav from "@/components/Nav";
import DemoSection from "@/sections/DemoSection";
import FooterSection from "@/sections/FooterSection";
import HeroSection from "@/sections/HeroSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import StatsSection from "@/sections/StatsSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Nav />
        <main>
          <HeroSection />
          <DemoSection />
          <HowItWorksSection />
          <StatsSection />
        </main>
        <FooterSection />
      </div>
    </QueryClientProvider>
  );
}
