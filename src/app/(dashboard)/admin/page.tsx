import React from "react";
import UserCard from "../../../components/UserCard";
import FinanceChart from "../../../components/FinanceChart";
import Announcements from "../../../components/Announcements";
import CountChartContainer from "@/components/CountChartContainer";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";

function AdminHomePage({searchParams}: { searchParams: Promise<Record<string, string | string[] | undefined>>; }) {
    return (
        <div className={'flex flex-col p-4 gap-4 md:flex-row'}>
            {/** LEFT */}
            <div className={'flex flex-col gap-4 w-full lg:w-2/3'}>
                {/** USER CARDS */}
                <div className={'flex gap-4 justify-between flex-wrap'}>
                    <UserCard type={'admin'}/>
                    <UserCard type={'teacher'}/>
                    <UserCard type={'student'}/>
                    <UserCard type={'parent'}/>
                </div>

                {/** MIDDLE CHARTS */}
                <div className={'flex flex-col lg:flex-row gap-4'}>
                    {/** COUNT CHART */}
                    <div className={'w-full lg:w-1/3 h-[450px]'}>
                        <CountChartContainer/>
                    </div>

                    {/** ATTENDANCE CHART */}
                    <div className={'w-full lg:w-2/3 h-[450px]'}>
                        <AttendanceChartContainer/>
                    </div>
                </div>

                {/** BOTTOM CHARTS */}
                <div className={'w-full h-[500px]'}>
                    <FinanceChart/>
                </div>
            </div>

            {/** RIGHT */}
            <div className={'flex flex-col gap-8 w-full lg:w-1/3'}>
                <EventCalendarContainer searchParams={searchParams}/>
                <Announcements/>
            </div>
        </div>
    );
}

export default AdminHomePage;
