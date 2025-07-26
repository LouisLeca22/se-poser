'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

type Props = {
    currentPage: number;
    totalPages: number;
    category?: string;
    search?: string;
    city?: string;
};

export default function HomePagination({ currentPage, totalPages, category, search, city }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category) params.set('category', category);
        if (search) params.set('search', search);
        if (city) params.set('city', city);
        params.set('page', page.toString());
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious aria-disabled={currentPage <= 1}
                            tabIndex={currentPage <= 1 ? -1 : undefined}
                            className={
                                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                            } onClick={() => goToPage(currentPage - 1)} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => goToPage(1)} >1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />

                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext aria-disabled={currentPage == totalPages}
                            tabIndex={currentPage == totalPages ? -1 : undefined}
                            className={
                                currentPage == totalPages ? "pointer-events-none opacity-50" : undefined
                            } onClick={() => goToPage(currentPage + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <span className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
            </span>

        </div >
    );
}
