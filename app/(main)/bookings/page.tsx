import EmptyList from '@/components/home/EmptyList';
import CityName from '@/components/card/CiityName';
import Link from 'next/link';

import { formatDate, formatCurrency } from '@/utils/format';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
import { fetchBookings, deleteBookingAction } from '@/utils/actions';

async function BookingsPage() {
    const bookings = await fetchBookings()
    if (bookings.length === 0) return <EmptyList />
    return (<div className="mt-16">
        <h4 className='mb-4'>Nombre de réservations : {bookings.length}</h4>
        <Table>
            <TableCaption>Liste de vos dernières réservations</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom de l&apos;hébergement</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Nuits</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Arrivée</TableHead>
                    <TableHead>Départ</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((booking) => {
                    const { id, orderTotal, totalNights, checkIn, checkOut } = booking
                    const { id: propertyId, name, city } = booking.property

                    const startDate = formatDate(checkIn)
                    const endDate = formatDate(checkOut)

                    return <TableRow key={id}>
                        <TableCell>
                            <Link className='underline text-muted-foreground tracking-wide' href={`/properties/${propertyId}`}>
                                {name}
                            </Link>
                        </TableCell>
                        <TableCell>
                            {city}
                        </TableCell>
                        <TableCell>
                            {totalNights}
                        </TableCell>
                        <TableCell>
                            {formatCurrency(orderTotal)}
                        </TableCell>
                        <TableCell>
                            {startDate}
                        </TableCell>
                        <TableCell>
                            {endDate}
                        </TableCell>
                        <TableCell>
                            <DeleteBooking bookingId={id} />
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </div>)
}

function DeleteBooking({ bookingId }: { bookingId: string }) {
    const deleteBooking = deleteBookingAction.bind(null, { bookingId })
    return <FormContainer action={deleteBooking}>
        <IconButton actionType='delete' />
    </FormContainer>
}
export default BookingsPage