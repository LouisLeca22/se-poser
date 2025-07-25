'use client';
import { useState } from 'react';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { Card } from '@/components/ui/card';
import RatingInput from '@/components/form/RatingInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import { createReviewAction } from '@/utils/actions';

function SubmitReview({ propertyId }: { propertyId: string }) {
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)

    return (
        <div className='mb-8'>
            <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
                Laisser un avis
            </Button>
            {
                isReviewFormVisible && <Card className='p-8 mt-8'>
                    <FormContainer action={createReviewAction}>
                        <input type="hidden" name="propertyId" value={propertyId} />
                        <RatingInput name="rating" />
                        <TextAreaInput name="comment" labelText='Votre avis sur cet hébérgement' defaultValue='Amazing project' />
                        <SubmitButton text="Envoyer" className="mt-4" />
                    </FormContainer>
                </Card>
            }
        </div>
    )
}
export default SubmitReview