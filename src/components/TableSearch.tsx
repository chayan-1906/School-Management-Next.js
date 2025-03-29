import Image from "next/image";

function TableSearch() {
    return (
        <div className={'flex w-full md:w-auto items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 p-2'}>
            <Image src={'/search.png'} alt={'search'} height={14} width={14}/>
            <input type={'text'} placeholder={'Search...'} className={'w-[200px bg-transparent outline-none'}/>
        </div>
    );
}

export default TableSearch;
