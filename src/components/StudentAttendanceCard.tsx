import Image from "next/image";
import prisma from "@/lib/prisma";

async function StudentAttendanceCard({id}: { id: string; }) {
    const attendance = await prisma.attendance.findMany({
        where: {
            studentId: id,
            date: {
                gte: new Date(new Date().getFullYear(), 0, 1),
            },
        },
    });

    const totalDays = attendance.length;
    const presentDays = attendance.filter((day) => day.present).length;
    const percentage = (presentDays / totalDays) * 100;

    return (
        <div className={'bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'}>
            <Image src={'/singleAttendance.png'} alt={''} width={24} height={24} className={'size-6'}/>
            <div className={''}>
                <h1 className={'text-xl font-semibold'}>{percentage ? `${percentage} %` : '-'}</h1>
                <span className={'text-sm text-gray-400'}>Attendance</span>
            </div>
        </div>
    );
}

export default StudentAttendanceCard;
