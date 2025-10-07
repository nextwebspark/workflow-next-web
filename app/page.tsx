import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/landing/hero';
import { Services } from '@/components/landing/services';
import { ProjectsPreview } from '@/components/landing/projects-preview';
import { Footer } from '@/components/layout/footer';
import { Technologies } from '@/components/landing/technologies';

interface PageProps {
  params: Promise<{}>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ params, searchParams }: PageProps) {
  await params;
  await searchParams;
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <ProjectsPreview />
      </main>
      <Footer />
    </div>
  );
}