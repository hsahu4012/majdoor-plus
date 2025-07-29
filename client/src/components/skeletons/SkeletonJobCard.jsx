export default function SkeletonJobCard() {
    return (
        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md animate-pulse space-y-3">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3" />
        </div>
    );
}
