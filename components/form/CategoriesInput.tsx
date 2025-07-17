import { Label } from '@/components/ui/label';
import { categories } from '@/utils/categories';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const name = 'category';



function CategoriesInput({ defaultValue }: { defaultValue?: string }) {
    return (
        <div className='mb-2'>
            <Label htmlFor={name} className='capitalize'>
                Catégories
            </Label>
            <Select defaultValue={defaultValue || categories[0].name} name={name} required>
                <SelectTrigger id={name}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => {
                        return <SelectItem key={category.name} value={category.name}>
                            <span className='flex items-center gap-2'>
                                <category.icon /> {category.label}
                            </span>
                        </SelectItem>
                    })}
                </SelectContent>
            </Select>

        </div>
    )
}
export default CategoriesInput