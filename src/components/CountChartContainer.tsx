import {FiMoreHorizontal} from "react-icons/fi";
import CountChart from "@/components/CountChart";
import prisma from "@/lib/prisma";

async function CountChartContainer() {
    const students = await prisma.student.groupBy({
        by: ['sex'],
        _count: true,
    });

    const boysCount = students.find((student) => student.sex === 'MALE')?._count || 0;
    const girlsCount = students.find((student) => student.sex === 'FEMALE')?._count || 0;

    return (
        <div className={'bg-white rounded-xl h-full w-full p-4 shadow-2xl shadow-gray-300'}>
            {/** TITLE */}
            <div className={'flex justify-between items-center'}>
                <h1 className={'text-lg font-semibold'}>Students</h1>
                <FiMoreHorizontal size={24}/>
            </div>

            {/** CHART */}
            <div className={'relative w-full h-[75%]'}>
                <CountChart boysCount={boysCount} girlsCount={girlsCount}/>
            </div>

            {/** BOTTOM */}
            <div className={'flex justify-center gap-16'}>
                <div className={'flex flex-col items-center gap-1'}>
                    <div className={'size-5 bg-lamaSky rounded-full'}/>
                    <h1 className={'font-bold'}>{boysCount}</h1>
                    <h2 className={'text-xs text-gray-300'}>Boys ({Math.round(boysCount / (boysCount + girlsCount) * 100)}%)</h2>
                </div>
                <div className={'flex flex-col items-center gap-1'}>
                    <div className={'size-5 bg-lamaYellow rounded-full'}/>
                    <h1 className={'font-bold'}>{girlsCount}</h1>
                    <h2 className={'text-xs text-gray-300'}>Girls ({Math.round(girlsCount / (boysCount + girlsCount) * 100)}%)</h2>
                </div>
            </div>
        </div>
    );
}

export default CountChartContainer;
