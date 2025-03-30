import React from "react";
import TableSearch from "@/components/TableSearch";
import {FaFilter, FaPlus} from "react-icons/fa";
import {RiSortAlphabetAsc} from "react-icons/ri";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import {routes} from "@/lib/routes";
import {cn} from "@/lib/utils";
import {assignmentsData, resultsData, role, WEB_CLIENT_URL} from "@/lib/data";
import {FaTrashCan} from "react-icons/fa6";
import {MdEdit} from "react-icons/md";
import FormModal from "@/components/FormModal";

type Result = {
    id: number;
    subject: string;
    class: number;
    teacher: string;
    student: string;
    date: string;
    type: string;
    score: number;
}

const columns = [
    {
        header: 'Subject',
        accessor: 'subject',
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

function ResultsPage() {
    const renderRow = ({id, subject, class: resultOfClass, teacher, student, date, type, score}: Result) => {
        return (
            <tr key={id} className={'border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight'}>
                <td className={'flex items-center gap-4 p-4'}>{subject}</td>
                <td className={''}>{student}</td>
                <td className={'hidden sm:table-cell'}>{score}</td>
                <td className={'hidden md:table-cell'}>{teacher}</td>
                <td className={'hidden md:table-cell'}>{resultOfClass}</td>
                <td className={'hidden md:table-cell'}>{date}</td>
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
            <Table columns={columns} data={resultsData} renderRow={renderRow}/>

            {/** PAGINATION */}
            <div className={''}>
                <Pagination/>
            </div>
        </div>
    );
}

export default ResultsPage;
