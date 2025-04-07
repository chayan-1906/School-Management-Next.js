import {GrAnnounce} from "react-icons/gr";
import prisma from "@/lib/prisma";
import getSessionClaims from "@/lib/getSessionClaims";

async function Announcements() {
    const {role, userId} = await getSessionClaims();

    const roleConditions = {
        teacher: {lessons: {some: {teacherId: userId}}},
        student: {students: {some: {id: userId}}},
        parent: {students: {some: {parentId: userId}}},
    }

    const announcements = await prisma.announcement.findMany({
        take: 3,
        orderBy: {date: 'desc'},
        where: {
            ...(role !== 'admin' && {
                OR: [
                    {classId: null},
                    {class: roleConditions[role as keyof typeof roleConditions] || {}},
                ],
            }),
        },
    });

    return (
        <div className={'bg-white p-4 rounded-md shadow-2xl shadow-gray-300 drop-shadow-2xl'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex gap-2 items-center'}>
                    <h1 className={'text-lg font-semibold'}>Announcements</h1>
                    <GrAnnounce size={20}/>
                </div>
                <span className={'text-xs text-gray-400'}>View All</span>
            </div>
            <div className={'flex flex-col gap-4 mt-4'}>
                {/** announcement #1 */}
                {announcements[0] && (
                    <div className={'bg-lamaSkyLight rounded-md p-4'}>
                        <div className={'flex items-center justify-between'}>
                            <h2 className={'font-medium'}>{announcements[0]?.title}</h2>
                            <span className={'text-xs text-gray-400 bg-white rounded-md p-1'}>{new Intl.DateTimeFormat('en-GB').format(announcements[0]?.date)}</span>
                        </div>
                        <p className={'text-sm text-gray-400 mt-1'}>{announcements[0]?.description}</p>
                    </div>
                )}

                {/** announcement #2 */}
                {announcements[1] && (
                    <div className={'bg-lamaPurpleLight rounded-md p-4'}>
                        <div className={'flex items-center justify-between'}>
                            <h2 className={'font-medium'}>{announcements[1]?.title}</h2>
                            <span className={'text-xs text-gray-400 bg-white rounded-md p-1'}>{new Intl.DateTimeFormat('en-GB').format(announcements[1]?.date)}</span>
                        </div>
                        <p className={'text-sm text-gray-400 mt-1'}>{announcements[1]?.description}</p>
                    </div>
                )}

                {/** announcement #3 */}
                {announcements[2] && (
                    <div className={'bg-lamaYellowLight rounded-md p-4'}>
                        <div className={'flex items-center justify-between'}>
                            <h2 className={'font-medium'}>{announcements[2]?.title}</h2>
                            <span className={'text-xs text-gray-400 bg-white rounded-md p-1'}>{new Intl.DateTimeFormat('en-GB').format(announcements[2]?.date)}</span>
                        </div>
                        <p className={'text-sm text-gray-400 mt-1'}>{announcements[2]?.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Announcements;
