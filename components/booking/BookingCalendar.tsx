'use client';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';

import {
    generateDisabledDates,
    generateDateRange,
    defaultSelected,
    generateBlockedPeriods,
} from '@/utils/calendar';

function BookingCalendar() {
    const currentDate = new Date()
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
    const bookings = useProperty((state) => state.bookings)
    const { toast } = useToast()

    const blockPeriods = generateBlockedPeriods({
        bookings, today: currentDate
    })

    const unavailableDates = generateDisabledDates(blockPeriods)


    useEffect(() => {
        const selectedRange = generateDateRange(range)
        selectedRange.some((date) => {
            if (unavailableDates[date]) {
                setRange(defaultSelected)
                toast({
                    description: "Certaines dates que vous avez séléctionnées sont déjà réservées."
                })
                return true
            }
        })
        useProperty.setState({ range })
    }, [range])


    return (
        <Calendar mode="range" defaultMonth={currentDate} selected={range} onSelect={setRange} disabled={blockPeriods} className='mb-4' />
    )
}
export default BookingCalendar