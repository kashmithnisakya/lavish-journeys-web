import { Skeleton } from "@/components/ui/skeleton";

function HeroSkeleton() {
  return (
    <section className="relative h-[520px] sm:h-[60vh] md:h-[75vh] bg-muted">
      <div className="container relative z-10 flex h-full items-center px-4 sm:px-6">
        <div className="max-w-2xl w-full space-y-4">
          <Skeleton className="h-6 w-48 bg-muted-foreground/10" />
          <Skeleton className="h-12 w-full max-w-lg bg-muted-foreground/10" />
          <Skeleton className="h-12 w-3/4 bg-muted-foreground/10" />
          <Skeleton className="h-5 w-full max-w-md bg-muted-foreground/10" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 w-40 rounded-lg bg-muted-foreground/10" />
            <Skeleton className="h-12 w-48 rounded-lg bg-muted-foreground/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PackageCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border shadow-elegant overflow-hidden flex flex-col">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-5/6" />
        </div>
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 flex-1 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function PackagesSkeleton() {
  return (
    <section className="container py-12 md:py-16">
      <div className="mb-6 md:mb-8 text-center space-y-2">
        <Skeleton className="h-9 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto max-w-full" />
      </div>
      <div className="flex justify-center gap-3 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-28 rounded-full" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <PackageCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

function StatsSkeleton() {
  return (
    <section className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="h-10 w-20 mx-auto" />
            <Skeleton className="h-4 w-28 mx-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}

function DestinationsSkeleton() {
  return (
    <section className="container py-12 md:py-16">
      <div className="mb-6 md:mb-8 text-center space-y-2">
        <Skeleton className="h-9 w-72 mx-auto" />
        <Skeleton className="h-5 w-[500px] mx-auto max-w-full" />
      </div>
      <div className="flex justify-center gap-4">
        <Skeleton className="h-[400px] w-[300px] rounded-xl" />
        <Skeleton className="h-[450px] w-[350px] rounded-xl hidden md:block" />
        <Skeleton className="h-[400px] w-[300px] rounded-xl hidden md:block" />
      </div>
    </section>
  );
}

export function IndexSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header skeleton */}
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <div className="hidden md:flex items-center gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md hidden md:block" />
          </div>
        </div>
      </header>

      <HeroSkeleton />
      <StatsSkeleton />
      <DestinationsSkeleton />
      <PackagesSkeleton />
    </div>
  );
}
