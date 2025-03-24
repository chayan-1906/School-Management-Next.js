import React from "react";
import UserCard from "../../../components/UserCard";
import CountChart from "../../../components/CountChart";
import AttendanceChart from "../../../components/AttendanceChart";
import FinanceChart from "../../../components/FinanceChart";
import EventCalendar from "../../../components/EventCalendar";
import Announcements from "../../../components/Announcements";

function AdminPage() {
    return (
        <div className={'flex flex-col p-4 gap-4 md:flex-row'}>
            {/** LEFT */}
            <div className={'flex flex-col gap-4 w-full lg:w-2/3'}>
                {/** USER CARDS */}
                <div className={'flex gap-4 justify-between flex-wrap'}>
                    <UserCard type={'students'}/>
                    <UserCard type={'teachers'}/>
                    <UserCard type={'parent'}/>
                    <UserCard type={'staff'}/>
                </div>

                {/** MIDDLE CHARTS */}
                <div className={'flex flex-col lg:flex-row gap-4'}>
                    {/** COUNT CHART */}
                    <div className={'w-full lg:w-1/3 h-[450px]'}>
                        <CountChart/>
                    </div>

                    {/** ATTENDANCE CHART */}
                    <div className={'w-full lg:w-2/3 h-[450px]'}>
                        <AttendanceChart/>
                    </div>
                </div>

                {/** BOTTOM CHARTS */}
                <div className={'w-full h-[500px]'}>
                    <FinanceChart/>
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

export default AdminPage;
