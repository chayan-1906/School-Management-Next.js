import {FiMoreHorizontal} from "react-icons/fi";
import AttendanceChart from "@/components/AttendanceChart";
import prisma from "@/lib/prisma";

async function AttendanceChartContainer() {
    // const today = new Date();
    const today = new Date('2025-04-10T15:29:36.119Z');
    const dayOfWeek = today.getDay();
    const daySinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDay() - daySinceMonday);

    const attendances = await prisma.attendance.findMany({
        where: {
            date: {gte: lastMonday},
        },
        select: {
            date: true,
            present: true,
        },
    });

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const attendanceMap: { [key: string]: { present: number; absent: number } } = {
        Mon: {present: 0, absent: 0},
        Tue: {present: 0, absent: 0},
        Wed: {present: 0, absent: 0},
        Thu: {present: 0, absent: 0},
        Fri: {present: 0, absent: 0},
    };

    attendances.forEach((attendance) => {
        const attendanceDate = new Date(attendance.date);
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            const dayName = daysOfWeek[dayOfWeek - 1];
            if (attendance.present) {
                attendanceMap[dayName].present += 1;
            } else {
                attendanceMap[dayName].absent += 1;
            }
        }
    });

    const formattedAttendanceMap = daysOfWeek.map((day) => ({
        name: day,
        present: attendanceMap[day].present,
        absent: attendanceMap[day].absent,
    }));

    console.log(attendanceMap);

    return (
        <div className={'bg-white rounded-xl h-full w-full p-4 shadow-2xl shadow-gray-300'}>
            {/** TITLE */}
            <div className={'flex justify-between items-center'}>
                <h1 className={'text-lg font-semibold'}>Attendance</h1>
                <FiMoreHorizontal size={24}/>
            </div>

            <AttendanceChart data={formattedAttendanceMap}/>

            {/** BOTTOM */}
            <div className={'flex justify-center gap-16'}>
                <div className={'flex flex-col items-center gap-1'}>
                    <div className={'size-5 bg-lamaSky rounded-full'}/>
                    <h1 className={'font-bold'}>1,234</h1>
                    <h2 className={'text-xs text-gray-300'}>Boys (55%)</h2>
                </div>
                <div className={'flex flex-col items-center gap-1'}>
                    <div className={'size-5 bg-lamaYellow rounded-full'}/>
                    <h1 className={'font-bold'}>1,234</h1>
                    <h2 className={'text-xs text-gray-300'}>Girls (45%)</h2>
                </div>
            </div>
        </div>
    );
}

export default AttendanceChartContainer;
