import { Suspense } from "react";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CertificationsSection } from "./sections/CertificationsSection";
// import { AchievementsSection } from "./sections/AchievementsSection";
import { ServicesSection } from "./sections/ServicesSection";
// import { BlogSection } from "./sections/BlogSection";
import { ContactSection } from "./sections/ContactSection";

// Generic Section Skeleton
function SectionSkeleton() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Skills Section Skeleton with chart placeholders
function SkillsSkeleton() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-neutral-200 dark:bg-neutral-800 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border bg-card overflow-hidden">
              <div className="border-b bg-muted/50 px-4 py-3">
                <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
              </div>
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                    <div className="h-4 flex-1 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section Skeleton with timeline
function ExperienceSkeleton() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded mx-auto animate-pulse" />
        </div>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative pl-8 pb-8 border-l-2 border-muted">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-700 animate-pulse" />
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                    <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Education Section Skeleton
function EducationSkeleton() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="h-12 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-56 bg-neutral-200 dark:bg-neutral-800 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border rounded-xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary/50 to-primary/20" />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
                  <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section Skeleton
function ServicesSkeleton() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="h-12 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-56 bg-neutral-200 dark:bg-neutral-800 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card border rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-800 mb-4 animate-pulse" />
              <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded mb-2 animate-pulse" />
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<ExperienceSkeleton />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<EducationSkeleton />}>
        <EducationSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CertificationsSection />
      </Suspense>
      {/* <AchievementsSection /> */}
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection />
      </Suspense>
      {/* <BlogSection /> */}
      <ContactSection />
    </>
  );
}

export default PortfolioContent;
