import { fetchReservations } from '@/utils/actions';
import Link from 'next/link';
import EmptyList from '@/components/home/EmptyList';

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

async function ReservationsPage() {
    const reservations = await fetchReservations()
    if (reservations.length === 0) return <EmptyList />

    return (
        <div className='mt-16'>
            <h4 className="mb-4">
                Nombre de réservations : {reservations.length}
            </h4>
            <Table>
                <TableCaption>Liste des réservations récentes sur vos hébérgements</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom de l&apos;hébérgement</TableHead>
                        <TableHead>Localisation</TableHead>
                        <TableHead>Nuits</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Arrivée</TableHead>
                        <TableHead>Départ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservations.map((item) => {
                        const { id, orderTotal, totalNights, checkIn, checkOut } = item
                        const { id: propertyId, name, city } = item.property
                        const startDate = formatDate(checkIn)
                        const endDate = formatDate(checkOut)
                        return <TableRow key={id}>
                            <TableCell>
                                <Link href={`/properties/${propertyId}`} className='underline text-muted-foreground tracking-wide'>
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
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
export default ReservationsPage