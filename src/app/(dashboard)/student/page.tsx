import React from "react";
import Announcements from "../../../components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import getSessionClaims from "@/lib/getSessionClaims";
import prisma from "@/lib/prisma";
import EventCalendar from "@/components/EventCalendar";

async function StudentHomePage() {
    const {role, userId} = await getSessionClaims();

    const classes = await prisma.class.findMany({
        where: {
            students: {
                some: {id: userId},
            },
        },
    });

    return (
        <div className={'flex flex-col xl:flex-row p-4 gap-4'}>
            {/** LEFT */}
            <div className={'w-full xl:w-2/3'}>
                <div className={'h-full bg-white p-4 rounded-md'}>
                    <h1 className={'text-xl font-semibold'}>Schedule (4A)</h1>
                    <BigCalendarContainer type={'classId'} id={classes[0].id}/>
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

export default StudentHomePage;
