import React from "react";
import Announcements from "../../../components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import getSessionClaims from "@/lib/getSessionClaims";

async function TeacherHomePage() {
    const {role, userId} = await getSessionClaims();

    return (
        <div className={'flex flex-col xl:flex-row flex-1 p-4 gap-4'}>
            {/** LEFT */}
            <div className={'w-full xl:w-2/3'}>
                <div className={'h-full bg-white p-4 rounded-md'}>
                    <h1 className={'text-xl font-semibold'}>Schedule</h1>
                    <BigCalendarContainer type={'teacherId'} id={userId!}/>
                </div>
            </div>

            {/** RIGHT */}
            <div className={'flex flex-col gap-8 w-full lg:w-1/3'}>
                <Announcements/>
            </div>
        </div>
    );
}

export default TeacherHomePage;
