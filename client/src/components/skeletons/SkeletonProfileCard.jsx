export default function SkeletonProfileCard() {
    return (
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md animate-pulse space-y-4">
            <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto" />
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto" />
        </div>
    );
}
