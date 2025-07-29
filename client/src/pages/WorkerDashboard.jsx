import SkeletonJobCard from "@/components/skeletons/SkeletonJobCard";
import JobCard from "@/components/JobCard"; // assuming this exists

function WorkerDashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs(); // your API fetch logic
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            {loading
                ? Array(3).fill(0).map((_, i) => <SkeletonJobCard key={i} />)
                : jobs.map((job) => <JobCard key={job._id} job={job} />)}
        </div>
    );
}
