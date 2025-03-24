'use client';

import {RadialBar, RadialBarChart, ResponsiveContainer} from "recharts";
import Image from "next/image";
import {FiMoreHorizontal} from "react-icons/fi";

const data = [
    {
        name: 'Total',
        count: 106,
        fill: '#FFF',
    },
    {
        name: 'Girls',
        count: 53,
        fill: '#FAE27C',
    },
    {
        name: 'Boys',
        count: 53,
        fill: '#C3EBFA',
    },
];

const CountChart = () => {
    return (
        <div className={'bg-white rounded-xl h-full w-full p-4 shadow-2xl shadow-gray-300'}>
            {/** TITLE */}
            <div className={'flex justify-between items-center'}>
                <h1 className={'text-lg font-semibold'}>Students</h1>
                {/*<Image src={'/moreDark.png'} alt={'students'} height={20} width={20}/>*/}
                <FiMoreHorizontal size={24}/>
            </div>

            {/** CHART */}
            <div className={'relative w-full h-[75%]'}>
                <ResponsiveContainer>
                    <RadialBarChart cx={'50%'} cy={'50%'} innerRadius={'40%'} outerRadius={'100%'} barSize={32} data={data}>
                        <RadialBar label={{position: 'insideStart', fill: '#FFF'}} background dataKey={'count'}/>
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image src={'/maleFemale.png'} alt={'male-female'} width={50} height={50} className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}/>
            </div>

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

export default CountChart;
