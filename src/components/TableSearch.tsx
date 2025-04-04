'use client';

import Image from "next/image";
import React, {useCallback} from "react";
import {useRouter} from "next/navigation";

function TableSearch({searchTerm}: { searchTerm?: string }) {
    const router = useRouter();

    const handleSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = (e.currentTarget[0] as HTMLInputElement).value;
        const params = new URLSearchParams(window.location.search);
        params.set('search', value);
        router.push(`${window.location.pathname}?${params}`);
    }, [router]);

    return (
        <form onSubmit={handleSubmit} className={'flex w-full md:w-auto items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 p-2'}>
            <Image src={'/search.png'} alt={'search'} height={14} width={14}/>
            <input type={'text'} defaultValue={searchTerm} placeholder={'Search...'} className={'w-[200px bg-transparent outline-none'}/>
        </form>
    );
}

export default TableSearch;
