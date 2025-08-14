'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type ButtonProps = {
    page: number;
    activeClass: boolean;
};

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

    const addPageButton = ({ page, activeClass }: ButtonProps) => {
        return (
            <Button
                key={page}
                size='icon'
                variant={activeClass ? 'default' : 'outline'}
                onClick={() => goToPage(page)}
            >
                {page}
            </Button>
        );
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        pageButtons.push(
            addPageButton({ page: 1, activeClass: currentPage === 1 })
        );


        if (currentPage > 3) {
            pageButtons.push(
                <Button size='icon' variant='outline' key='dots-1'>
                    ...
                </Button>
            );
        }

        if (currentPage !== 1 && currentPage !== 2) {
            pageButtons.push(
                addPageButton({
                    page: currentPage - 1,
                    activeClass: false,
                })
            );
        }

        if (currentPage !== 1 && currentPage !== totalPages) {
            pageButtons.push(
                addPageButton({
                    page: currentPage,
                    activeClass: true,
                })
            );
        }

        if (currentPage !== totalPages && currentPage !== totalPages - 1) {
            pageButtons.push(
                addPageButton({
                    page: currentPage + 1,
                    activeClass: false,
                })
            );
        }
        if (currentPage < totalPages - 2) {
            pageButtons.push(
                <Button size='icon' variant='outline' key='dots-2'>
                    ...
                </Button>
            );
        }
        pageButtons.push(
            addPageButton({
                page: totalPages,
                activeClass: currentPage === totalPages,
            })
        );
        return pageButtons;
    };

    return (
        <div className='mt-12 flex items-center justify-center gap-4'>

            <Button
                className='flex items-center gap-x-2 '
                variant='outline'
                onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) prevPage = totalPages;
                    goToPage(prevPage);
                }}
            >
                <MdChevronLeft />
                précédent
            </Button>
            {renderPageButtons()}

            <Button
                className='flex items-center gap-x-2 '
                onClick={() => {
                    let nextPage = currentPage + 1;
                    if (nextPage > totalPages) nextPage = 1;
                    goToPage(nextPage);
                }}
                variant='outline'
            >
                suivant
                <MdChevronRight />
            </Button>
        </div>
    );
}
