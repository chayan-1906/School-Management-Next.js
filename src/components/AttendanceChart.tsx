'use client';

import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {FiMoreHorizontal} from "react-icons/fi";

const data = [
    {
        name: 'Mon',
        present: 60,
        absent: 40,
    },
    {
        name: 'Tue',
        present: 70,
        absent: 60,
    },
    {
        name: 'Wed',
        present: 90,
        absent: 75,
    },
    {
        name: 'Thu',
        present: 90,
        absent: 75,
    },
    {
        name: 'Fri',
        present: 65,
        absent: 55,
    },
];

const AttendanceChart = () => {
    return (
        <div className={'bg-white rounded-xl h-full w-full p-4 shadow-2xl shadow-gray-300'}>
            {/** TITLE */}
            <div className={'flex justify-between items-center'}>
                <h1 className={'text-lg font-semibold'}>Attendance</h1>
                {/*<Image src={'/moreDark.png'} alt={'students'} height={20} width={20}/>*/}
                <FiMoreHorizontal size={24}/>
            </div>

            {/** CHART */}
            <ResponsiveContainer height={'75%'} width={'100%'}>
                <BarChart width={500} height={300} data={data} barSize={20}>
                    <CartesianGrid strokeDasharray={'3 3'} vertical={false} stroke={'#DDD'}/>
                    <XAxis dataKey={'name'} axisLine={false} tick={{fill: '#D1D5DB'}} tickLine={false}/>
                    <YAxis axisLine={false} tick={{fill: '#D1D5DB'}} tickLine={false}/>
                    <Tooltip contentStyle={{borderRadius: '10px', borderColor: 'lightgray'}}/>
                    <Legend align={'left'} verticalAlign={'top'} wrapperStyle={{paddingTop: '20px', paddingBottom: '40px'}}/>
                    <Bar dataKey={'present'} fill={'#FAE27C'} legendType={'circle'} radius={[10, 10, 0, 0]}/>
                    <Bar dataKey={'absent'} fill={'#C3EBFA'} legendType={'circle'} radius={[10, 10, 0, 0]}/>
                </BarChart>
            </ResponsiveContainer>

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

export default AttendanceChart;
