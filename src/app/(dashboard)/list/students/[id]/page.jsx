import Image from "next/image";
import {MdBloodtype, MdEmail} from "react-icons/md";
import {CiCalendarDate} from "react-icons/ci";
import {FaPhone} from "react-icons/fa";
import BigCalendar from "../../../../../components/BigCalendar";
import Announcements from "../../../../../components/Announcements";
import Link from "next/link";
import Performance from "../../../../../components/Performance";
import {routes} from "../../../../../lib/routes";

function SingleStudentPage() {
    return (
        <div className={'flex flex-col xl:flex-row flex-1 p-4 gap-4'}>
            {/** TOP */}
            <div className={'w-full xl:w-2/3'}>
                {/** TOP */}
                <div className={'flex flex-col lg:flex-row gap-4'}>
                    {/** USER INFO CARD */}
                    <div className={'flex-1 flex gap-4 py-6 px-4 rounded-md bg-lamaSky'}>
                        {/*<div className={'w-1/3'}>*/}
                        <Image src={'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg'} alt={'teacher-profile-picture'} height={144} width={144}
                               className={'size-36 rounded-full object-cover'}/>
                        {/*</div>*/}
                        <div className={'w-2/3 flex flex-col justify-between gap-4'}>
                            <h1 className={'text-xl font-semibold'}>Cameron Moran</h1>
                            <p className={'text-sm text-gray-500 text-justify'}>
                                A dedicated and curious student, actively engaged in learning, participating in activities, and striving for academic and personal growth.
                            </p>
                            <div className={'flex flex-wrap items-center justify-between gap-2 text-sm font-medium'}>
                                <div className={'w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 overflow-ellipsis'}>
                                    <MdBloodtype size={20} className={'flex-shrink-0'}/>
                                    <span>A+</span>
                                </div>
                                <div className={'w-full md:w-1/3 lg:w-full 2xl:w-1/2 flex items-center gap-2 overflow-ellipsis'}>
                                    <CiCalendarDate size={20} className={'flex-shrink-0'}/>
                                    <span>January 2025</span>
                                </div>
                                <div className={'w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 overflow-ellipsis'}>
                                    <MdEmail size={20} className={'flex-shrink-0'}/>
                                    <span className={'w-full overflow-hidden text-ellipsis'}>leonard.snyder@oakwood.com</span>
                                </div>
                                <div className={'w-full md:w-1/3 lg:w-full 2xl:w-1/2 flex items-center gap-2 overflow-ellipsis'}>
                                    <FaPhone size={16} className={'flex-shrink-0'}/>
                                    <span>+1 (234)-567-8901</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/** SMALL CARDS */}
                    <div className={'flex flex-wrap flex-1 justify-between gap-4'}>
                        {/** ATTENDANCE CARD */}
                        <div className={'bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'}>
                            <Image src={'/singleAttendance.png'} alt={''} width={24} height={24} className={'size-6'}/>
                            <div className={''}>
                                <h1 className={'text-xl font-semibold'}>90%</h1>
                                <span className={'text-sm text-gray-400'}>Attendance</span>
                            </div>
                        </div>

                        {/** BRANCH CARD */}
                        <div className={'bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'}>
                            <Image src={'/singleBranch.png'} alt={''} width={24} height={24} className={'size-6'}/>
                            <div className={''}>
                                <h1 className={'text-xl font-semibold'}>6th</h1>
                                <span className={'text-sm text-gray-400'}>Grade</span>
                            </div>
                        </div>

                        {/** LESSONS CARD */}
                        <div className={'bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'}>
                            <Image src={'/singleClass.png'} alt={''} width={24} height={24} className={'size-6'}/>
                            <div className={''}>
                                <h1 className={'text-xl font-semibold'}>18</h1>
                                <span className={'text-sm text-gray-400'}>Lessons</span>
                            </div>
                        </div>

                        {/** CLASSES CARD */}
                        <div className={'bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'}>
                            <Image src={'/singleClass.png'} alt={''} width={24} height={24} className={'size-6'}/>
                            <div className={''}>
                                <h1 className={'text-xl font-semibold'}>6A</h1>
                                <span className={'text-sm text-gray-400'}>Class</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/** BOTTOM */}
                <div className={'mt-4 bg-white rounded-md p-4 h-[800px]'}>
                    <h1>Student&apos;s Schedule</h1>
                    <BigCalendar/>
                </div>
            </div>

            {/** RIGHT */}
            <div className={'w-full xl:w-1/3 flex flex-col gap-4'}>
                <div className={'bg-white p-4 rounded-md'}>
                    <h1 className={'text-xl font-semibold'}>Shortcuts</h1>
                    <div className={'flex flex-wrap mt-4 gap-4 text-xs text-gray-500'}>
                        <Link href={routes.classesPath} className={'p-3 rounded-md bg-lamaSkyLight'}>Student&apos;s Classes</Link>
                        <Link href={routes.teachersPath({classId: 2})} className={'p-3 rounded-md bg-lamaPurpleLight'}>Student&apos;s Teachers</Link>
                        <Link href={routes.lessonsPath} className={'p-3 rounded-md bg-lamaYellowLight'}>Student&apos;s Lessons</Link>
                        <Link href={routes.examsPath} className={'p-3 rounded-md bg-pink-50'}>Student&apos;s Exams</Link>
                        <Link href={routes.assignmentsPath} className={'p-3 rounded-md bg-lamaSkyLight'}>Student&apos;s Assignments</Link>
                    </div>
                </div>
                <Performance/>
                <Announcements/>
            </div>
        </div>
    );
}

export default SingleStudentPage;
