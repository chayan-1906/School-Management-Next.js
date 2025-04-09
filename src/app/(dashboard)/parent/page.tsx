import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import getSessionClaims from "@/lib/getSessionClaims";
import prisma from "@/lib/prisma";

async function ParentHomePage() {
    const {role, userId} = await getSessionClaims();

    const students = await prisma.student.findMany({
        where: {
            parentId: userId,
        },
    });

    return (
        <div className={'flex flex-col xl:flex-row flex-1 p-4 gap-4'}>
            {/** LEFT */}
            <div className={'flex-1'}>
                {students.map(({id, name, surname, classId}) => (
                    <div key={id}>
                        <div className={'h-full bg-white p-4 rounded-md'}>
                            <h1 className={'text-xl font-semibold'}>Schedule ({name} {surname})</h1>
                            <BigCalendarContainer id={classId} type={'classId'}/>
                        </div>
                    </div>
                ))}
            </div>

            {/** RIGHT */}
            <div className={'flex flex-col gap-8 w-full lg:w-1/3'}>
                <Announcements/>
            </div>
        </div>
    );
}

export default ParentHomePage;
