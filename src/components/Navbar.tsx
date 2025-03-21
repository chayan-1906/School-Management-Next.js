import Image from "next/image";

function Navbar() {
    return (
        <div className={'flex items-center justify-between p-4'}>
            {/** SEARCH BAR */}
            <div className={'hidden md:flex gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 p-2'}>
                <Image src={'/search.png'} alt={'search'} height={14} width={14}/>
                <input type={'text'} placeholder={'Search...'} className={'w-[200px bg-transparent outline-none'}/>
            </div>

            {/** ICONS AND USER */}
            <div className={'flex items-center justify-end w-full gap-6'}>
                <div className={'flex items-center justify-center bg-white rounded-full size-7 cursor-pointer'}>
                    <Image src={'/message.png'} alt={'message'} height={20} width={20}/>
                </div>
                <div className={'relative flex items-center justify-center bg-white rounded-full size-7 cursor-pointer'}>
                    <Image src={'/announcement.png'} alt={'announcement'} height={20} width={20}/>
                    <div className={'absolute -top-3 -right-3 size-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'}>1</div>
                </div>
                <div className={'flex flex-col'}>
                    <span className={'text-xs leading-3 font-medium'}>John Doe</span>
                    <span className={'text-[10px] text-gray-500 text-end'}>Admin</span>
                </div>
                <Image src={'/avatar.png'} alt={'avatar'} height={36} width={36} className={'rounded-full'}/>
            </div>
        </div>
    );
}

export default Navbar;
