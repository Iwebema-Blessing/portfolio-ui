import { Hero } from '@/components/home/Hero';
import { TechStack } from '@/components/home/TechStack';
import { ProjectRail } from '@/components/home/ProjectRail';
import { ServicesBento } from '@/components/home/ServicesBento';
import { MissionVision } from '@/components/home/MissionVision';
import { CallToAction } from '@/components/home/CallToAction';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Home() {
  usePageTitle('Blessing Iwebema — web and mobile developer');

  return (
    <>
      <Hero />
      <TechStack />
      <ProjectRail />
      <ServicesBento limit={4} />
      <MissionVision />
      <CallToAction />
    </>
  );
}
