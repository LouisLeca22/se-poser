import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";


type TextareaInputProps = {
    name: string
    labelText?: string
    defaultValue?: string
}



function TextAreaInput({ name, labelText, defaultValue }: TextareaInputProps) {
    return (
        <div className="mb-2">
            <Label htmlFor={name}>
                {labelText || name}
            </Label>
            <Textarea id={name} name={name} defaultValue={defaultValue} rows={5} required className="leading-loose" />
        </div>
    )
}
export default TextAreaInput