import FormInput from "@/components/form/FormInput"
import FormContainer from "@/components/form/FormContainer"
import { createPropertyAction } from "@/utils/actions"
import { SubmitButton } from "@/components/form/Buttons"
import PriceInput from "@/components/form/PriceInput"
import CategoriesInput from "@/components/form/CategoriesInput"
import TextAreaInput from "@/components/form/TextAreaInput"
import AddressInput from "@/components/form/AddressInput"
import ImageInput from "@/components/form/ImageInput"
import CounterInput from "@/components/form/CounterInput"
import AmenitiesInput from "@/components/form/AmenitiesInput"

function CreatePropertyPage() {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">
                Créer un hébergement
            </h1>
            <div className="border p-8 rounded">
                <h3 className="text-lg mb-4 font-medium">
                    Informations générales
                </h3>
                <FormContainer action={createPropertyAction}>
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                        <FormInput name='name' type="text" label="Nom (20 caractères max)" />
                        <FormInput name='tagline' type="text" label="Phrase d'accroche (30 caractères max)" />
                        <PriceInput />
                        <CategoriesInput />
                    </div>
                    <TextAreaInput name="description" labelText="Description (10 - 1000 mots)" />
                    <div className="grid sm:grid-cols-2 gap-8 mb-4">
                        <AddressInput />
                        <ImageInput />
                    </div>
                    <h3 className="text-lg mt-8 mb-4 font-medium">
                        Détails de l&apos;hébergement
                    </h3>
                    <CounterInput name="guests" detail="voyageurs" />
                    <CounterInput name="bedrooms" detail="chambres" />
                    <CounterInput name="beds" detail="lits" />
                    <CounterInput name="baths" detail="salles de bain" />
                    <h3 className="text-lg mt-10 mb-6 font-medium">Équipements</h3>
                    <AmenitiesInput />
                    <SubmitButton text="Créer l'hébergement" className="mt-12" />
                </FormContainer>
            </div>
        </section>
    )
}
export default CreatePropertyPage