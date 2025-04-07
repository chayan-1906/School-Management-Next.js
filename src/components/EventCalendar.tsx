'use client';

import {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import {Calendar} from "react-calendar";
import {useRouter} from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventCalendar() {
    const [date, onChange] = useState<Value>(new Date());
    const router = useRouter();

    useEffect(() => {
        if (date instanceof Date) {
            router.push(`?date=${date}`);
        }
    }, [router, date]);

    return (
        <Calendar value={date} onChange={onChange}/>
    );
}

export default EventCalendar;
