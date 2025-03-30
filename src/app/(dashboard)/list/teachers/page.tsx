import React from "react";
import TableSearch from "@/components/TableSearch";
import {FaEye, FaFilter} from "react-icons/fa";
import {RiSortAlphabetAsc} from "react-icons/ri";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import {routes} from "@/lib/routes";
import {role, teachersData, WEB_CLIENT_URL} from "@/lib/data";
import FormModal from "@/components/FormModal";

type Teacher = {
    id: number;
    teacherId: string;
    name: string;
    email?: string;
    photo: string;
    phone: string;
    subjects: string[];
    classes: string[];
    address?: string;
}

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

function TeachersPage() {
    const renderRow = ({id, teacherId, name, photo, email, phone, address, classes, subjects}: Teacher) => {
        return (
            <tr key={id} className={'border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight'}>
                <td className={'flex items-center gap-4 p-4'}>
                    <Image src={photo} alt={name} height={40} width={40} className={'md:hidden xl:block size-10 rounded-full object-cover'}/>
                    <div className={'flex flex-col'}>
                        <h3 className={'font-semibold'}>{name}</h3>
                        <h4 className={'text-xs text-gray-500'}>{email}</h4>
                    </div>
                </td>
                <td className={'hidden md:table-cell'}>{teacherId}</td>
                <td className={'hidden md:table-cell'}>{subjects.join(', ')}</td>
                <td className={'hidden md:table-cell'}>{classes.join(', ')}</td>
                <td className={'hidden lg:table-cell'}>{phone}</td>
                <td className={'hidden lg:table-cell'}>{address}</td>
                <td>
                    <div className={'flex items-center gap-2'}>
                        <Link href={routes.teacherPath(id)}>
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
            <Table columns={columns} data={teachersData} renderRow={renderRow}/>

            {/** PAGINATION */}
            <div className={''}>
                <Pagination/>
            </div>
        </div>
    );
}

export default TeachersPage;
