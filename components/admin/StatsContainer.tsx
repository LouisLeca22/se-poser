import { fetchStats } from "@/utils/actions"
import StatsCard from "./StatsCard"


async function StatsContainer() {
    const data = await fetchStats()

    return (
        <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
            <StatsCard title="Utilisateurs" value={data.usersCount || 0} />
            <StatsCard title="Hébérgements" value={data.propertiesCount || 0} />
            <StatsCard title="Réservations" value={data.bookingsCount || 0} />

        </div>
    )
}
export default StatsContainer