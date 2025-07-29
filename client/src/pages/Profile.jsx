import SkeletonProfileCard from "@/components/skeletons/SkeletonProfileCard";
import ProfileCard from "@/components/ProfileCard";

function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile(); // your fetch logic
    }, []);

    return (
        <div className="p-4">
            {!profile ? (
                <SkeletonProfileCard />
            ) : (
                <ProfileCard data={profile} />
            )}
        </div>
    );
}
