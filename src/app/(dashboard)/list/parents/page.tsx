import React from "react";
import TableSearch from "@/components/TableSearch";
import {FaFilter, FaPlus} from "react-icons/fa";
import {RiSortAlphabetAsc} from "react-icons/ri";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import {routes} from "@/lib/routes";
import {cn} from "@/lib/utils";
import {parentsData, role, WEB_CLIENT_URL} from "@/lib/data";
import {FaTrashCan} from "react-icons/fa6";
import {MdEdit} from "react-icons/md";

type Parent = {
    id: number;
    name: string;
    students: string[];
    email?: string;
    phone: string;
    address?: string;
}

const columns = [
    {
        header: 'Info',
        accessor: 'info',
    },
    {
        header: 'Student Names',
        accessor: 'students',
        className: 'hidden sm:table-cell',
    },
    {
        header: 'Phone',
        accessor: 'phone',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Address',
        accessor: 'address',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

export async function generateMetadata() {
    console.log('generateMetadata called');

    const title = 'Parents';
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

function ParentPage() {
    const renderRow = ({id, name, students, email, phone, address}: Parent) => {
        return (
            <tr key={id} className={'border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight'}>
                <td className={'flex items-center gap-4 p-4'}>
                    <div className={'flex flex-col'}>
                        <h3 className={'font-semibold'}>{name}</h3>
                        <h4 className={'text-xs text-gray-500'}>{email}</h4>
                    </div>
                </td>
                <td className={'hidden sm:table-cell'}>{students.join(', ')}</td>
                <td className={'hidden md:table-cell'}>{phone}</td>
                <td className={'hidden md:table-cell'}>{address}</td>
                <td>
                    <div className={'flex items-center gap-2'}>
                        <Link href={routes.teacherPath(id)}>
                            {/** VIEW */}
                            <button className={'flex items-center justify-center size-7 rounded-full bg-lamaSky'}>
                                <MdEdit color={'white'}/>
                            </button>
                        </Link>

                        {/** DELETE */}
                        <button className={cn('flex items-center justify-center size-7 rounded-full bg-lamaPurple', role === 'admin' ? 'flex' : 'hidden')}>
                            <FaTrashCan color={'white'}/>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <div className={'flex-1 rounded-md p-4 m-4 mt-0'}>
            {/** TOP */}
            <div className={'flex items-center justify-between'}>
                <h1 className={'hidden md:block text-lg font-semibold'}>All Parents</h1>
                <div className={'flex flex-col md:flex-row w-full md:w-auto items-center gap-4'}>
                    <TableSearch/>
                    <div className={'flex items-center gap-4 self-end'}>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <RiSortAlphabetAsc size={16}/>
                        </button>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <FaFilter size={12}/>
                        </button>
                        <button className={'flex size-8 items-center justify-center rounded-full bg-lamaYellow'}>
                            <FaPlus size={12}/>
                        </button>
                    </div>
                </div>
            </div>

            {/** LIST */}
            <Table columns={columns} data={parentsData} renderRow={renderRow}/>

            {/** PAGINATION */}
            <div className={''}>
                <Pagination/>
            </div>
        </div>
    );
}

export default ParentPage;
