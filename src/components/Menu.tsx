import Image from "next/image";
import {role} from "@/lib/data";
import Link from "next/link";
import {routes} from "@/lib/routes";

const menuItems = [
    {
        title: 'MENU',
        items: [
            {
                icon: '/home.png',
                label: 'Home',
                href: '/',
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/teacher.png',
                label: 'Teachers',
                href: routes.teachersPath,
                visible: ['admin', 'teacher'],
            },
            {
                icon: '/student.png',
                label: 'Students',
                href: routes.studentsPath,
                visible: ['admin', 'teacher'],
            },
            {
                icon: '/parent.png',
                label: 'Parents',
                href: routes.parentsPath,
                visible: ['admin', 'teacher'],
            },
            {
                icon: '/subject.png',
                label: 'Subjects',
                href: routes.subjectsPath,
                visible: ['admin'],
            },
            {
                icon: '/class.png',
                label: 'Classes',
                href: routes.classesPath,
                visible: ['admin', 'teacher'],
            },
            {
                icon: '/lesson.png',
                label: 'Lessons',
                href: routes.lessonsPath,
                visible: ['admin', 'teacher'],
            },
            {
                icon: '/exam.png',
                label: 'Exams',
                href: routes.examsPath,
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/assignment.png',
                label: 'Assignments',
                href: routes.assignmentsPath,
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/result.png',
                label: 'Results',
                href: routes.resultsPath,
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/attendance.png',
                label: 'Attendance',
                href: routes.attendancePath,
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/calendar.png',
                label: 'Events',
                href: routes.eventsPath,
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/message.png',
                label: 'Messages',
                href: routes.messagesPath,
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/announcement.png',
                label: 'Announcements',
                href: routes.announcementsPath,
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
        ],
    },
    {
        title: 'OTHER',
        items: [
            {
                icon: '/profile.png',
                label: 'Profile',
                href: '/profile',
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/setting.png',
                label: 'Settings',
                href: '/settings',
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
            {
                icon: '/logout.png',
                label: 'Logout',
                href: '/logout',
                visible: ['admin', 'teacher', 'student', 'parent'],
            },
        ],
    },
];

const Menu = () => {
    return (
        <div className={'mt-4 text-sm'}>
            {menuItems.map(({items, title}) => (
                <div key={title} className={'flex flex-col gap-2'}>
                    <span className={'hidden lg:block text-gray-400 font-light my-4'}>{title}</span>
                    {items.map(({icon, label, href, visible}) => {
                            if (visible.includes(role)) {
                                return (
                                    <Link key={label} href={href} className={'flex items-center justify-center lg:justify-start  gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight'}>
                                        <Image src={icon} alt={label} height={20} width={20}/>
                                        <span className={'hidden lg:block'}>{label}</span>
                                    </Link>
                                )
                            }
                        }
                    )}
                </div>
            ))}
        </div>
    );
}

export default Menu;
