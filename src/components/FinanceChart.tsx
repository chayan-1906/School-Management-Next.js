'use client';

import {BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {FiMoreHorizontal} from "react-icons/fi";

const data = [
    {
        name: 'Jan',
        income: 4000,
        expense: 2400,
    },
    {
        name: 'Feb',
        income: 3000,
        expense: 1398,
    },
    {
        name: 'Mar',
        income: 2000,
        expense: 9800,
    },
    {
        name: 'Apr',
        income: 2780,
        expense: 3908,
    },
    {
        name: 'May',
        income: 1890,
        expense: 4800,
    },
    {
        name: 'Jun',
        income: 2390,
        expense: 3800,
    },
    {
        name: 'Jul',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Aug',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Sep',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Oct',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Nov',
        income: 3490,
        expense: 4300,
    },
    {
        name: 'Dec',
        income: 3490,
        expense: 4300,
    },
];

const FinanceChart = () => {
    return (
        <div className={'bg-white rounded-xl h-full w-full p-4 shadow-2xl shadow-gray-300'}>
            {/** TITLE */}
            <div className={'flex justify-between items-center'}>
                <h1 className={'text-lg font-semibold'}>Finance</h1>
                {/*<Image src={'/moreDark.png'} alt={'students'} height={20} width={20}/>*/}
                <FiMoreHorizontal size={24}/>
            </div>

            {/** CHART */}
            <ResponsiveContainer height={'75%'} width={'100%'}>
                <LineChart width={500} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 16}}>
                    <CartesianGrid strokeDasharray={'3 3'} stroke={'#DDD'}/>
                    <XAxis dataKey={'name'} axisLine={false} tick={{fill: '#D1D5DB'}} tickLine={false} tickMargin={20}/>
                    <YAxis axisLine={false} tick={{fill: '#D1D5DB'}} tickLine={false}/>
                    <Tooltip contentStyle={{borderRadius: '10px', borderColor: 'lightgray'}}/>
                    <Legend align={'center'} verticalAlign={'top'} wrapperStyle={{paddingTop: '10px', paddingBottom: '30px'}}/>
                    <Line type={'monotone'} dataKey={'income'} stroke={'#C3EBFA'} activeDot={{r: 8}}/>
                    <Line type={'monotone'} dataKey={'expense'} stroke={'#CFCEFF'} strokeWidth={5}/>
                </LineChart>
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

export default FinanceChart;
