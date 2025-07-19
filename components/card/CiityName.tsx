import { MdLocationOn } from "react-icons/md";
function CiityName({ city }: { city: string }) {


    const cityName = city.length > 20 ? `${city.substring(0, 20)}...` : city
    return (
        <span className="flex justify-between items-center  text-sm">
            <MdLocationOn /> {cityName}
        </span>
    )
}
export default CiityName