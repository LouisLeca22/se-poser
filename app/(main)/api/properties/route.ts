// app/api/properties/route.ts
import { NextResponse } from 'next/server';
import db from "@/utils/db"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const [properties, totalCount] = await Promise.all([
        db.property.findMany({
            where: {
                category,
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { tagline: { contains: search, mode: 'insensitive' } },
                ],
                city,
            },
            select: {
                id: true,
                name: true,
                image: true,
                tagline: true,
                city: true,
                price: true,
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: perPage,
        }),
        db.property.count({
            where: {
                category,
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { tagline: { contains: search, mode: 'insensitive' } },
                ],
                city,
            },
        }),
    ]);

    return NextResponse.json({ properties, totalCount });
}
