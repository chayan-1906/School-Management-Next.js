import React from "react";
import EventCalendar from "../../../../components/EventCalendar";
import Announcements from "../../../../components/Announcements";

function StudentPage() {
    return (
        <div className={'flex flex-col xl:flex-row p-4 gap-4'}>
            {/** LEFT */}
            <div className={'flex flex-col gap-4 w-full lg:w-2/3'}>
                <div className={'w-full xl:w-2/3'}>
                    <div className={'h-full bg-white p-4 rounded-md'}>
                        <h1 className={'text-xl font-semibold'}>Schedule (4A)</h1>
                    </div>
                </div>
            </div>

            {/** RIGHT */}
            <div className={'flex flex-col gap-8 w-full lg:w-1/3'}>
                <EventCalendar/>
                <Announcements/>
            </div>
        </div>
    );
}

export default StudentPage;
