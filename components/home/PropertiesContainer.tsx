import { fetchProperties } from '@/utils/actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';
import type { PropertyCardProps } from '@/utils/types';

async function PropertiesContainer({ category, search, city }: { category?: string, search?: string, city?: string }) {
    const properties: PropertyCardProps[] = await fetchProperties({ category, search, city })
    if (properties.length == 0) {
        return (
            <EmptyList heading="Aucun résultat" message="Essayer de changer vos filtres" btnText='Réinitialiser les filtres' />
        )
    }

    return <PropertiesList properties={properties} />

}
export default PropertiesContainer