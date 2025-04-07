import {FiMoreHorizontal} from "react-icons/fi";
import prisma from "@/lib/prisma";

async function UserCard({type}: { type: 'admin' | 'teacher' | 'student' | 'parent' }) {
    const modelMap: Record<typeof type, any> = {
        admin: prisma.admin,
        teacher: prisma.teacher,
        student: prisma.student,
        parent: prisma.parent,
    }

    const modelCount = await modelMap[type].count();

    return (
        <div className={'rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px] shadow-2xl shadow-gray-300'}>
            <div className={'flex justify-between items-center'}>
                <span className={'text-[10px] bg-white px-2 py-1 rounded-full text-green-600'}>2024/25</span>
                <FiMoreHorizontal size={24} className={'text-white'}/>
            </div>
            <h1 className={'text-2xl font-semibold my-4'}>{modelCount}</h1>
            <h2 className={'capitalize text-sm font-medium text-gray-500'}>{type}</h2>
        </div>
    );
}

export default UserCard;
