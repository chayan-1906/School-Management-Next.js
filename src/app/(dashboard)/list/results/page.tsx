import React from "react";
import TableSearch from "@/components/TableSearch";
import {FaFilter} from "react-icons/fa";
import {RiSortAlphabetAsc} from "react-icons/ri";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {isNumeric} from "@/lib/utils";
import {role, WEB_CLIENT_URL} from "@/lib/data";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import {ITEMS_PER_PAGE} from "@/lib/config";

type ResultList = {
    id: number;
    title: string;
    studentName: string;
    studentSurname: string;
    teacherName: string;
    teacherSurname: string;
    score: number;
    className: number;
    startTime: Date;
}

const columns = [
    {
        header: 'Title',
        accessor: 'title',
    },
    {
        header: 'Student',
        accessor: 'student',
    },
    {
        header: 'Score',
        accessor: 'score',
        className: 'hidden sm:table-cell',
    },
    {
        header: 'Teacher',
        accessor: 'teacher',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Class',
        accessor: 'class',
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

    const title = 'Results';
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

const renderRow = ({id, title, studentName, studentSurname, teacherName, teacherSurname, score, className, startTime}: ResultList) => {
    return (
        <tr key={id} className={'border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight'}>
            <td className={'flex items-center gap-4 p-4'}>{title}</td>
            <td className={''}>{studentName} {studentSurname}</td>
            <td className={'hidden sm:table-cell'}>{score}</td>
            <td className={'hidden md:table-cell'}>{teacherName} {teacherSurname}</td>
            <td className={'hidden md:table-cell'}>{className}</td>
            <td className={'hidden md:table-cell'}>{new Intl.DateTimeFormat('en-US').format(startTime)}</td>
            <td>
                <div className={'flex items-center gap-2'}>
                    {role === 'admin' && (
                        <>
                            {/** UPDATE */}
                            <FormModal table={'result'} type={'update'} id={id}/>

                            {/** DELETE */}
                            <FormModal table={'result'} type={'delete'} id={id}/>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}

async function ResultsPage({searchParams}: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const {page: rawPage, ...queryParams} = await searchParams || {};
    const page = rawPage ? Number(rawPage) : 1;

    /** URL PARAMS CONDITION */
    const query: Prisma.ResultWhereInput = {};

    if (queryParams) {
        for (let [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                value = Array.isArray(value) ? value[0] : value;

                switch (key) {
                    case 'studentId':
                        query.studentId = value;
                        break;
                    case 'search':
                        query.OR = [
                            {exam: {title: {contains: value, mode: 'insensitive'}}},
                            {student: {name: {contains: value, mode: 'insensitive'}}},
                        ];
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [dataResults, resultsCount] = await prisma.$transaction([
        prisma.result.findMany({
            where: query,
            include: {
                student: {select: {name: true, surname: true}},
                exam: {
                    include: {
                        lesson: {
                            select: {
                                class: {select: {name: true}},
                                teacher: {select: {name: true, surname: true}},
                            },
                        },
                    },
                },
                assignment: {
                    include: {
                        lesson: {
                            select: {
                                class: {select: {name: true}},
                                teacher: {select: {name: true, surname: true}},
                            },
                        },
                    },
                },
            },
            take: ITEMS_PER_PAGE,   // 10 objects per request
            skip: isNumeric(page) ? ITEMS_PER_PAGE * (Number(page) - 1) : 0,
        }),
        prisma.result.count({where: query}),
    ]);

    const results = dataResults.map((result) => {
        const assessment = result.exam || result.assignment;
        if (!assessment) return null;
        const isExam = 'startTime' in assessment;

        return {
            id: result.id,
            title: assessment.title,
            studentName: result.student.name,
            studentSurname: result.student.surname,
            teacherName: assessment.lesson.teacher.name,
            teacherSurname: assessment.lesson.teacher.surname,
            score: result.score,
            className: assessment.lesson.class.name,
            startTime: isExam ? assessment.startTime : assessment.startDate,
        };
    });

    return (
        <div className={'flex-1 rounded-md p-4 m-4 mt-0'}>
            {/** TOP */}
            <div className={'flex items-center justify-between'}>
                <h1 className={'hidden md:block text-lg font-semibold'}>All Results</h1>
                <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-4'}>
                    <TableSearch/>
                    <div className={'flex items-center gap-4 self-end'}>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <RiSortAlphabetAsc size={16}/>
                        </button>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <FaFilter size={12}/>
                        </button>
                        {role === 'admin' && (
                            <FormModal table={'result'} type={'create'}/>
                        )}
                    </div>
                </div>
            </div>

            {/** LIST */}
            <Table columns={columns} data={results} renderRow={renderRow}/>

            {/** PAGINATION */}
            <div className={''}>
                <Pagination page={page} count={resultsCount}/>
            </div>
        </div>
    );
}

export default ResultsPage;
