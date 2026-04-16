
const BannerSkeleton = () => {
    return (
        <section className="relative overflow-hidden py-24 sm:py-32 w-full">
            <div className="relative container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">

                    {/* Left — header skeleton */}
                    <header className="flex flex-col gap-4">
                        {/* Badge */}
                        <SkeletonBox className="h-6 w-28 rounded-full" />

                        {/* Title lines */}
                        <div className="flex flex-col gap-3 mt-2">
                            <SkeletonBox className="h-10 w-4/5" />
                            <SkeletonBox className="h-10 w-3/5" />
                            <SkeletonBox className="h-10 w-3/4" />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2 mt-3 max-w-md">
                            <SkeletonBox className="h-4 w-full" />
                            <SkeletonBox className="h-4 w-11/12" />
                            <SkeletonBox className="h-4 w-3/4" />
                        </div>
                    </header>

                    {/* Right — carousel card skeleton */}
                    <div className="relative w-full max-w-125 mx-auto lg:ml-auto">
                        <SkeletonBox className="w-full aspect-4/3 rounded-3xl" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BannerSkeleton;


function SkeletonBox({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-md bg-seGray/10 ${className ?? ""}`}
        />
    );
}
