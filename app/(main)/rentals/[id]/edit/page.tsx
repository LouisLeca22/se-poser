import {
    fetchRentalDetails,
    updatePropertyImageAction,
    updatePropertyAction,
} from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import AddressInput from '@/components/form/AddressInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { SubmitButton } from '@/components/form/Buttons';
import { redirect } from 'next/navigation';
import { type Amenity } from '@/utils/amenities';
import ImageInputContainer from '@/components/form/ImageInputContainer';

async function EditRentalPage({ params }: { params: { id: string } }) {
    const property = await fetchRentalDetails(params.id)
    if (!property) redirect("/")
    const defaultAmenities: Amenity[] = JSON.parse(property.amenities)
    return <section>
        <h1 className="text-2xl font-semibold mb-8">Modifier l&pos;hébérgement</h1>
        <div className="border p-8 rounded-md">
            <ImageInputContainer name={property.name} text="Mettre à jour l&apos;image" action={updatePropertyImageAction} image={property.image}>
                <input type="hidden" name="id" value={property.id} />
            </ImageInputContainer>
            <FormContainer action={updatePropertyAction}>
                <input type="hidden" name="id" value={property.id} />
                <div className='grid md:grid-cols-2 gap-8 mb-4 mt-8'>
                    <FormInput name="name" type="text" label="Nom (20 caractères max" defaultValue={property.name} />
                    <FormInput name="tagline" type="text" label="Phrase d'accroche (30 caractères max)" defaultValue={property.tagline} />
                    <PriceInput defaultValue={property.price} />
                    <CategoriesInput defaultValue={property.category} />
                    <AddressInput defaultValue={property.address} />
                </div>
                <TextAreaInput name="description" labelText='Description (10-1000 mots)' defaultValue={property.description} />
                <h3 className='text-lg mt-8 mb-4 font-medium'>
                    Détails de l&apos;hébérgement
                </h3>
                <CounterInput name="guests" detail="voyageurs" defaultValue={property.guests} />
                <CounterInput name="bedrooms" detail="chambres" defaultValue={property.bedrooms} />
                <CounterInput name="beds" detail="lits" defaultValue={property.beds} />
                <CounterInput name="baths" detail="salles de bain" defaultValue={property.baths} />
                <h3 className="text-lg mt-10 mb-6 font-medium">Équipements</h3>
                <AmenitiesInput defaultValue={defaultAmenities} />
                <SubmitButton text="Mettre à jour l&apos;hébéregement" className='mt-12' />
            </FormContainer>
        </div>
    </section>
}
export default EditRentalPage