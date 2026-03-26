import { Skeleton } from "@/components/ui/skeleton";

export function PackagePageSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative">
        <Skeleton className="h-[300px] md:h-[400px] w-full rounded-none" />
      </div>

      <div className="container py-8 md:py-12 max-w-5xl">
        {/* Title & meta */}
        <div className="space-y-3 mb-8">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>

        {/* Description */}
        <div className="bg-muted/50 rounded-xl p-6 mb-8 space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Highlights grid */}
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid gap-3 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className="mb-8">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <Skeleton className="h-12 flex-1 rounded-md" />
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}
