import { fetchProperties } from '@/utils/actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';
import type { PropertyCardProps } from '@/utils/types';
import HomePagination from './HomePagination';

const PER_PAGE = 10;


async function PropertiesContainer({ category, search, city, page = 1 }: { category?: string, search?: string, city?: string, page?: number }) {
    const { properties, totalCount }: { properties: PropertyCardProps[]; totalCount: number } =
        await fetchProperties({ category, search, city, page, perPage: PER_PAGE });
    if (properties.length == 0) {
        return (
            <EmptyList heading="Aucun résultat" message="Essayer de changer vos filtres" btnText='Réinitialiser les filtres' />
        )
    }


    const totalPages = Math.ceil(totalCount / PER_PAGE);

    return (
        <>
            <PropertiesList properties={properties} />
            <HomePagination currentPage={page} totalPages={totalPages} category={category} search={search} city={city} />
        </>
    )

}
export default PropertiesContainer