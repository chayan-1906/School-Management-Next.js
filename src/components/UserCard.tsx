import {FiMoreHorizontal} from "react-icons/fi";

function UserCard({type}: { type: string }) {
    return (
        <div className={'rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]'}>
            <div className={'flex justify-between items-center'}>
                <span className={'text-[10px] bg-white px-2 py-1 rounded-full text-green-600'}>2024/25</span>
                {/*<Image src={'/more.png'} alt={''} height={20} width={20}/>*/}
                <FiMoreHorizontal size={24} className={'text-white'}/>
            </div>
            <h1 className={'text-2xl font-semibold my-4'}>1,234</h1>
            <h2 className={'capitalize text-sm font-medium text-gray-500'}>{type}</h2>
        </div>
    );
}

export default UserCard;
