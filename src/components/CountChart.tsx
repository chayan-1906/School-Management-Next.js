'use client';

import {RadialBar, RadialBarChart, ResponsiveContainer} from "recharts";
import Image from "next/image";

const CountChart = ({boysCount, girlsCount}: { boysCount: number; girlsCount: number; }) => {
    const data = [
        {
            name: 'Total',
            count: boysCount + girlsCount,
            fill: '#FFF',
        },
        {
            name: 'Girls',
            count: girlsCount,
            fill: '#FAE27C',
        },
        {
            name: 'Boys',
            count: boysCount,
            fill: '#C3EBFA',
        },
    ];

    return (
        <div className={'relative w-full h-[75%]'}>
            <ResponsiveContainer>
                <RadialBarChart cx={'50%'} cy={'50%'} innerRadius={'40%'} outerRadius={'100%'} barSize={32} data={data}>
                    <RadialBar label={{position: 'insideStart', fill: '#FFF'}} background dataKey={'count'}/>
                </RadialBarChart>
            </ResponsiveContainer>
            <Image src={'/maleFemale.png'} alt={'male-female'} width={50} height={50} className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}/>
        </div>
    );
}

export default CountChart;
