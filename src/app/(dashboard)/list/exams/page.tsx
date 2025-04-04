import React from "react";
import TableSearch from "@/components/TableSearch";
import {FaFilter} from "react-icons/fa";
import {RiSortAlphabetAsc} from "react-icons/ri";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {isNumeric} from "@/lib/utils";
import {role, WEB_CLIENT_URL} from "@/lib/data";
import FormModal from "@/components/FormModal";
import {Class, Exam, Prisma, Subject, Teacher} from "@prisma/client";
import prisma from "@/lib/prisma";
import {ITEMS_PER_PAGE} from "@/lib/config";

type ExamList = Exam & { lesson: { subject: Subject, class: Class, teacher: Teacher } };

const columns = [
    {
        header: 'Subject',
        accessor: 'subject',
    },
    {
        header: 'Class',
        accessor: 'class',
    },
    {
        header: 'Teacher',
        accessor: 'teacher',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Date',
        accessor: 'date',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

export async function generateMetadata() {
    console.log('generateMetadata called');

    const title = 'Exams';
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

const renderRow = ({id, lesson: {subject, class: examOfClass, teacher}, startTime}: ExamList) => {
    return (
        <tr key={id} className={'border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight'}>
            <td className={'flex items-center gap-4 p-4'}>{subject.name}</td>
            <td className={''}>{examOfClass.name}</td>
            <td className={'hidden md:table-cell'}>{teacher.name} {teacher.surname}</td>
            <td className={'hidden md:table-cell'}>{new Intl.DateTimeFormat('en-US').format(startTime)}</td>
            <td>
                <div className={'flex items-center gap-2'}>
                    {role === 'admin' && (
                        <>
                            {/** UPDATE */}
                            <FormModal table={'exam'} type={'update'} id={id}/>

                            {/** DELETE */}
                            <FormModal table={'exam'} type={'delete'} id={id}/>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}

async function ExamsPage({searchParams}: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const {page: rawPage, ...queryParams} = await searchParams || {};
    const page = rawPage ? Number(rawPage) : 1;

    /** URL PARAMS CONDITION */
    const query: Prisma.ExamWhereInput = {};

    if (queryParams) {
        for (let [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                value = Array.isArray(value) ? value[0] : value;

                switch (key) {
                    case 'teacherId':
                        query.lesson = {teacherId: value};
                        break;
                    case 'classId':
                        query.lesson = {classId: isNumeric(value) ? Number(value) : undefined};
                        break;
                    case 'search':
                        query.lesson = {
                            subject: {
                                name: {contains: value, mode: 'insensitive'},
                            },
                        };
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [exams, examsCount] = await prisma.$transaction([
        prisma.exam.findMany({
            where: query,
            include: {
                lesson: {
                    select:
                        {
                            subject: {select: {name: true}},
                            teacher: {select: {name: true, surname: true}},
                            class: {select: {name: true}},
                        },
                },
            },
            take: ITEMS_PER_PAGE,   // 10 objects per request
            skip: isNumeric(page) ? ITEMS_PER_PAGE * (Number(page) - 1) : 0,
        }),
        prisma.exam.count({where: query}),
    ]);

    return (
        <div className={'flex-1 rounded-md p-4 m-4 mt-0'}>
            {/** TOP */}
            <div className={'flex items-center justify-between'}>
                <h1 className={'hidden md:block text-lg font-semibold'}>All Exams</h1>
                <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-4'}>
                    <TableSearch/>
                    <div className={'flex items-center gap-4 self-end'}>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <RiSortAlphabetAsc size={16}/>
                        </button>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <FaFilter size={12}/>
                        </button>
                        <FormModal table={'exam'} type={'create'}/>
                    </div>
                </div>
            </div>

            {/** LIST */}
            <Table columns={columns} data={exams} renderRow={renderRow}/>

            {/** PAGINATION */}
            <div className={''}>
                <Pagination page={page} count={examsCount}/>
            </div>
        </div>
    );
}

export default ExamsPage;
