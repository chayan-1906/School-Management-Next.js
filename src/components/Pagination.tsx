'use client';

import {ITEMS_PER_PAGE} from "@/lib/config";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {useCallback} from "react";

function Pagination({page, count}: { page: number; count: number; }) {
    const router = useRouter();

    const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
    const hasNext = (ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE) < count;

    const changePage = useCallback((page: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', page.toString());
        router.push(`${window.location.pathname}?${params}`);
    }, [router]);

    return (
        <div className={'flex items-center justify-between text-gray-500 p-4'}>
            <button disabled={!hasPrev} className={'py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'} onClick={() => changePage(page - 1)}>
                Prev
            </button>
            <div className={'flex items-center text-sm gap-2'}>
                {Array.from({length: Math.ceil(count / ITEMS_PER_PAGE)}, (_, index) => {
                    const pageIndex = index + 1;

                    return (
                        <button key={pageIndex} className={cn('p-2 rounded-sm', page === pageIndex ? 'bg-lamaSky' : '')} onClick={() => changePage(pageIndex)}>
                            {pageIndex}
                        </button>
                    );
                })}
            </div>
            <button disabled={!hasNext} className={'py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'} onClick={() => changePage(page + 1)}>
                Next
            </button>
        </div>
    );
}

export default Pagination;
