import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";


type TextareaInputProps = {
    name: string
    labelText?: string
    defaultValue?: string
}

const templateDefaultDescription = "Glamping à la française dans un chalet en bois, situé au cœur d’un charmant verger. Climatisation, chauffage, lit queen-size, télévision, Wi-Fi et une vue imprenable. À proximité de la forêt de Fontainebleau, de la Seine et des sentiers de randonnée. Canoës disponibles pour naviguer sur la rivière. Sanitaires communs, brasero, kitchenette, œufs frais. Détendez-vous et profitez de l’air frais de la campagne. Chiens non admis. Canards, poules et coqs déambulent librement sur le terrain. Nous avons un chien rescue de la région, un retriever et un poméranien. L’espace est à la fois inspirant et reposant. Profitez de la beauté du verger. Les arbres sont en fleurs au printemps et récoltés à l’automne. Nous avons un petit magasin de produits fermiers où vous pouvez acheter des produits locaux."


function TextAreaInput({ name, labelText, defaultValue }: TextareaInputProps) {
    return (
        <div className="mb-2">
            <Label htmlFor={name}>
                {labelText || name}
            </Label>
            <Textarea id={name} name={name} defaultValue={defaultValue || templateDefaultDescription} rows={5} required className="leading-loose" />
        </div>
    )
}
export default TextAreaInput