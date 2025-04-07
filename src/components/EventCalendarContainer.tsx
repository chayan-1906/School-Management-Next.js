import {MdOutlineEvent} from "react-icons/md";
import {FiMoreHorizontal} from "react-icons/fi";
import EventCalendar from "@/components/EventCalendar";
import EventList from "@/components/EventList";

async function EventCalendarContainer({searchParams}: { searchParams: Promise<Record<string, string | string[] | undefined>>; }) {
    const {date: rawDate} = await searchParams || {};
    const date = Array.isArray(rawDate) ? rawDate[0] : rawDate;

    return (
        <div className={'bg-white p-4 rounded-md shadow-2xl shadow-gray-300 drop-shadow-2xl'}>
            <EventCalendar/>
            <div className={'flex items-center justify-between'}>
                <div className={'flex gap-2 items-center'}>
                    <h1 className={'text-lg font-semibold my-4'}>Events</h1>
                    <MdOutlineEvent size={20}/>
                </div>
                <FiMoreHorizontal size={24}/>
            </div>
            <div className={'flex flex-col gap-4'}>
                <EventList dateParam={date}/>
            </div>
        </div>
    );
}

export default EventCalendarContainer;
