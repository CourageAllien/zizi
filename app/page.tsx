import GradientBanner from "@/components/agentone/GradientBanner";
import AgentOneHeader from "@/components/agentone/Header";
import AgentOneHero from "@/components/agentone/Hero";
import WhatSiriShouldBe from "@/components/agentone/WhatSiriShouldBe";
import IntegrationDiagram from "@/components/agentone/IntegrationDiagram";

export default function Home() {
  return (
    <>
      <GradientBanner />
      <AgentOneHeader />
      <main className="bg-[#fafafa]">
        <AgentOneHero />
        <WhatSiriShouldBe />
        <IntegrationDiagram />
      </main>
    </>
  );
}
