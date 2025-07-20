import { formatQuantity } from '@/utils/format';

type PropertyDetailsProps = {
    details: {
        bedrooms: number;
        baths: number;
        guests: number;
        beds: number;
    };
};

function PropertyDetails({ details: { bedrooms, baths, guests, beds } }: PropertyDetailsProps) {
    return (
        <p className='text-md font-light'>
            <span>{formatQuantity(bedrooms, 'chambre')} &middot; </span>
            <span>{formatQuantity(baths, 'salle de bain')} &middot; </span>
            <span>{formatQuantity(guests, 'voyageur')} &middot; </span>
            <span>{formatQuantity(beds, 'lit')} </span>
        </p>
    )
}
export default PropertyDetails