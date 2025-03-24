'use client';

import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {FiMoreHorizontal} from "react-icons/fi";
import {MdOutlineEvent} from "react-icons/md";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
    {
        id: 1,
        title: 'Lorem ipsum dolor',
        time: '12:00 PM - 2:00 PM',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 2,
        title: 'Lorem ipsum dolor',
        time: '12:00 PM - 2:00 PM',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 3,
        title: 'Lorem ipsum dolor',
        time: '12:00 PM - 2:00 PM',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
];

function EventCalendar() {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className={'bg-white p-4 rounded-md shadow-2xl shadow-gray-300'}>
            <Calendar value={value} onChange={onChange}/>
            <div className={'flex items-center justify-between'}>
                <div className={'flex gap-2 items-center'}>
                    <h1 className={'text-lg font-semibold my-4'}>Events</h1>
                    <MdOutlineEvent size={20}/>
                </div>
                <FiMoreHorizontal size={24}/>
            </div>

            <div className={'flex flex-col gap-4'}>
                {events.map(({id, title, description, time}) => (
                    <div key={id} className={'p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple'}>
                        <div className={'flex items-center justify-between'}>
                            <h1 className={'font-semibold text-gray-600'}>{title}</h1>
                            <span className={'text-gray-300 text-xs'}>{time}</span>
                        </div>
                        <p className={'mt-2 text-gray-400 text-sm'}>{description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventCalendar;
