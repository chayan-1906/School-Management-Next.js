import React from "react";
import TableSearch from "@/components/TableSearch";
import {FaFilter} from "react-icons/fa";
import {RiSortAlphabetAsc} from "react-icons/ri";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {role, WEB_CLIENT_URL} from "@/lib/data";
import FormModal from "@/components/FormModal";
import {Class, Grade, Prisma, Teacher} from "@prisma/client";
import prisma from "@/lib/prisma";
import {ITEMS_PER_PAGE} from "@/lib/config";
import {isNumeric} from "@/lib/utils";

type ClassList = Class & { supervisor: Teacher } & { grade: Grade }

const columns = [
    {
        header: 'Class Name',
        accessor: 'name',
    },
    {
        header: 'Capacity',
        accessor: 'capacity',
    },
    {
        header: 'Grade',
        accessor: 'grade',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Supervisor',
        accessor: 'supervisor',
        className: 'hidden sm:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

export async function generateMetadata() {
    console.log('generateMetadata called');

    const title = 'Classes';
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

const renderRow = ({id, name, capacity, grade, supervisor}: ClassList) => {
    return (
        <tr key={id} className={'border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight'}>
            <td className={'flex items-center gap-4 p-4'}>{name}</td>
            <td className={''}>{capacity}</td>
            <td className={'hidden md:table-cell'}>{grade.level}</td>
            <td className={'hidden sm:table-cell'}>{supervisor.name} {supervisor.surname}</td>
            <td>
                <div className={'flex items-center gap-2'}>
                    {role === 'admin' && (
                        <>
                            {/** UPDATE */}
                            <FormModal table={'class'} type={'update'} id={id}/>

                            {/** DELETE */}
                            <FormModal table={'class'} type={'delete'} id={id}/>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}

async function ClassesPage({searchParams}: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const {page: rawPage, ...queryParams} = await searchParams || {};
    const page = rawPage ? Number(rawPage) : 1;

    /** URL PARAMS CONDITION */
    const query: Prisma.ClassWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case 'supervisorId':
                        query.supervisorId = Array.isArray(value) ? value[0] : value;
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

    const [classes, classesCount] = await prisma.$transaction([
        prisma.class.findMany({
            where: query,
            include: {
                grade: true,
                supervisor: true,
            },
            take: ITEMS_PER_PAGE,   // 10 objects per request
            skip: isNumeric(page) ? ITEMS_PER_PAGE * (Number(page) - 1) : 0,
        }),
        prisma.class.count({where: query}),
    ]);

    return (
        <div className={'flex-1 rounded-md p-4 m-4 mt-0'}>
            {/** TOP */}
            <div className={'flex items-center justify-between'}>
                <h1 className={'hidden md:block text-lg font-semibold'}>All Classes</h1>
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
                            <FormModal table={'class'} type={'create'}/>
                        )}
                    </div>
                </div>
            </div>

            {/** LIST */}
            <Table columns={columns} data={classes} renderRow={renderRow}/>

            {/** PAGINATION */}
            <div className={''}>
                <Pagination page={page} count={classesCount}/>
            </div>
        </div>
    );
}

export default ClassesPage;
