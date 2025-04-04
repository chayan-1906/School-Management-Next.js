import BigCalendar from "@/components/BigCalendar";
import Announcements from "@/components/Announcements";

function ParentPage() {
    return (
        <div className={'flex flex-col xl:flex-row flex-1 p-4 gap-4'}>
            {/** LEFT */}
            <div className={'w-full xl:w-2/3'}>
                <div className={'h-full bg-white p-4 rounded-md'}>
                    <h1 className={'text-xl font-semibold'}>Schedule (John Doe)</h1>
                    <BigCalendar/>
                </div>
            </div>

            {/** RIGHT */}
            <div className={'flex flex-col gap-8 w-full lg:w-1/3'}>
                <Announcements/>
            </div>
        </div>
    );
}

export default ParentPage;
