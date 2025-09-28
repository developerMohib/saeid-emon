
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
                <p className="text-gray-600 font-medium text-sm tracking-wide">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
}