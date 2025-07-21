import { DateRange } from 'react-day-picker';
import { Booking } from '@/utils/types';

export const defaultSelected: DateRange = {
    from: undefined,
    to: undefined,
};

// block unavailable and past dates in the calendar
export const generateBlockedPeriods = ({
    bookings,
    today,
}: {
    bookings: Booking[];
    today: Date;
}) => {
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

    const disabledDays: DateRange[] = [
        ...bookings.map((booking) => ({
            from: booking.checkIn,
            to: booking.checkOut,
        })),
        {
            from: new Date(0), // This is 01 January 1970 00:00:00 UTC.
            to: new Date(today.getTime() - 24 * 60 * 60 * 1000), // This is yesterday.
        },
    ];
    return disabledDays;
};

//  generate the array of date selected by the user
export const generateDateRange = (range: DateRange | undefined): string[] => {
    if (!range || !range.from || !range.to) return [];

    let currentDate = new Date(range.from);
    const endDate = new Date(range.to);
    const dateRange: string[] = [];

    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        dateRange.push(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
};

// generate an array of dates that cannot be booked 
export const generateDisabledDates = (
    disabledDays: DateRange[]
): { [key: string]: boolean } => {
    if (disabledDays.length === 0) return {};

    const disabledDates: { [key: string]: boolean } = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set time to 00:00:00 to compare only the date part

    disabledDays.forEach((range) => {
        if (!range.from || !range.to) return;

        let currentDate = new Date(range.from);
        const endDate = new Date(range.to);

        while (currentDate <= endDate) {
            if (currentDate < today) {
                currentDate.setDate(currentDate.getDate() + 1);
                continue;
            }
            const dateString = currentDate.toISOString().split('T')[0];
            disabledDates[dateString] = true;
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });

    return disabledDates;
};

// calculate number of nights for the subtotal 
export function calculateDaysBetween({
    checkIn,
    checkOut,
}: {
    checkIn: Date;
    checkOut: Date;
}) {
    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(checkOut.getTime() - checkIn.getTime());

    // Convert the difference in milliseconds to days
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays;
}