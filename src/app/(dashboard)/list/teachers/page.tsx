import React from "react";
import TableSearch from "@/components/TableSearch";
import {FaEye, FaFilter} from "react-icons/fa";
import {RiSortAlphabetAsc} from "react-icons/ri";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import {routes} from "@/lib/routes";
import {role, WEB_CLIENT_URL} from "@/lib/data";
import FormModal from "@/components/FormModal";
import {Class, Prisma, Subject, Teacher} from "@prisma/client";
import prisma from "@/lib/prisma";
import {ITEMS_PER_PAGE} from "@/lib/config";
import {isNumeric} from "@/lib/utils";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] }

const columns = [
    {
        header: 'Info',
        accessor: 'info',
    },
    {
        header: 'Teacher ID',
        accessor: 'teacherId',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Subjects',
        accessor: 'subjects',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Classes',
        accessor: 'classes',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Phone',
        accessor: 'phone',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'Address',
        accessor: 'address',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

export async function generateMetadata() {
    console.log('generateMetadata called');

    const title = 'Teachers';
    const description = '';
    // const icons = (await parent).icons ?? {};

    const metadata = {
        title: title,
        description: description,
        url: WEB_CLIENT_URL,
        type: 'website',
        // icons,
        openGraph: {
            title: title,
            description: description,
            url: WEB_CLIENT_URL,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            url: WEB_CLIENT_URL,
        },
    };

    return metadata;
}

const renderRow = ({id, username, name, img, email, phone, address, classes, subjects}: TeacherList) => {
    return (
        <tr key={id} className={'border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight'}>
            <td className={'flex items-center gap-4 p-4'}>
                <Image src={img || '/noAvatar.png'} alt={name} height={40} width={40} className={'md:hidden xl:block size-10 rounded-full object-cover'}/>
                <div className={'flex flex-col'}>
                    <h3 className={'font-semibold'}>{name}</h3>
                    <h4 className={'text-xs text-gray-500'}>{email}</h4>
                </div>
            </td>
            <td className={'hidden md:table-cell'}>{username}</td>
            <td className={'hidden md:table-cell'}>{subjects.map((subject) => subject.name).join(', ')}</td>
            <td className={'hidden md:table-cell'}>{classes.map(classObject => classObject.name).join(', ')}</td>
            <td className={'hidden lg:table-cell'}>{phone}</td>
            <td className={'hidden lg:table-cell'}>{address}</td>
            <td>
                <div className={'flex items-center gap-2'}>
                    <Link href={routes.teacherPath(id, {})}>
                        {/** VIEW */}
                        <button className={'flex items-center justify-center size-7 rounded-full bg-lamaSky'}>
                            <FaEye color={'white'}/>
                        </button>
                    </Link>

                    {/** DELETE */}
                    {role === 'admin' && (
                        <FormModal table={'teacher'} type={'delete'} id={id}/>
                    )}
                </div>
            </td>
        </tr>
    );
}

async function TeachersPage({searchParams}: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const {page: rawPage, ...queryParams} = await searchParams || {};
    const page = rawPage ? Number(rawPage) : 1;

    /** URL PARAMS CONDITION */
    const query: Prisma.TeacherWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case 'classId':
                        query.lessons = {
                            some: {
                                classId: Number(value),
                            },
                        };
                        break;
                    case 'search':
                        query.name = {contains: Array.isArray(value) ? value[0] : value, mode: 'insensitive'};
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [teachers, teachersCount] = await prisma.$transaction([
        prisma.teacher.findMany({
            where: query,
            include: {
                subjects: true,
                classes: true,
            },
            take: ITEMS_PER_PAGE,   // 10 objects per request
            skip: isNumeric(page) ? ITEMS_PER_PAGE * (Number(page) - 1) : 0,
        }),
        prisma.teacher.count({where: query}),
    ]);

    return (
        <div className={'flex-1 rounded-md p-4 m-4 mt-0'}>
            {/** TOP */}
            <div className={'flex items-center justify-between'}>
                <h1 className={'hidden md:block text-lg font-semibold'}>All Teachers</h1>
                <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-4'}>
                    <TableSearch/>
                    <div className={'flex items-center gap-4 self-end'}>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <RiSortAlphabetAsc size={16}/>
                        </button>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <FaFilter size={12}/>
                        </button>
                        {/*<button className={cn('size-8 items-center justify-center rounded-full bg-lamaYellow', role === 'admin' ? 'flex' : 'hidden')}>
                            <FaPlus size={12}/>
                        </button>*/}
                        {role === 'admin' && (
                            <FormModal table={'teacher'} type={'create'}/>
                        )}
                    </div>
                </div>
            </div>

            {/** LIST */}
            <Table columns={columns} data={teachers} renderRow={renderRow}/>

            {/** PAGINATION */}
            <div className={''}>
                {/*{typeof window !== 'undefined' && (*/}
                <Pagination page={page} count={teachersCount}/>
                {/*)}*/}
            </div>
        </div>
    );
}

export default TeachersPage;
