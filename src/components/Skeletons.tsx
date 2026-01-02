import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const HeroSkeleton = () => (
  <section className="min-h-screen flex items-center justify-center px-6 py-20">
    <div className="max-w-6xl w-full">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative">
          <Skeleton className="w-64 h-80 rounded-[50%]" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <Skeleton className="h-16 w-80 mx-auto md:mx-0" />
          <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto md:mx-0" />
          <div className="flex gap-4 justify-center md:justify-start">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-32" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const ProjectCardSkeleton = () => (
  <Card className="h-full p-6 border-border">
    <div className="flex items-start gap-4 mb-4">
      <Skeleton className="w-12 h-12 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6 mb-4" />
    <div className="space-y-2 mb-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    <div className="flex gap-2 mb-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-6 w-16 rounded-full" />
      ))}
    </div>
    <Skeleton className="h-10 w-full" />
  </Card>
);

export const SkillsSkeleton = () => (
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Skeleton className="h-16 w-64 mx-auto mb-4" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-6 border-border">
            <Skeleton className="h-8 w-32 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export const ContactFormSkeleton = () => (
  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
    <div className="space-y-2 mb-6">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-[150px] w-full" />
    </div>
    <Skeleton className="h-10 w-full md:w-auto min-w-[200px]" />
  </div>
);
