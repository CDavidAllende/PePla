import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonSchemaProps {
  grid?: number
}

export function SkeletonSchema({ grid = 3 }: SkeletonSchemaProps) {
  return (
    <>
      {Array.from({ length: grid }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </>
  )
}
