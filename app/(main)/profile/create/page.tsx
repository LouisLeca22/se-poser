import { SubmitButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import { createProfileAction } from "@/utils/actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

async function CreateProfilePage() {
    const user = await currentUser()
    if (user?.privateMetadata?.hasProfile) redirect("/")
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">Nouvel utilisateur</h1>
            <div className="border p-8 rounded-md">
                <FormContainer action={createProfileAction}>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <FormInput type="text" name="firstName" label="Prénom" />
                        <FormInput type="text" name="lastName" label="Nom" />
                        <FormInput type="text" name="username" label="Pseudonyme" />
                    </div>
                    <SubmitButton text="Créer le profil" className="mt-8" />
                </FormContainer>
            </div>
        </section>
    )
}
export default CreateProfilePage