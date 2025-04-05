import React from "react";
import TableSearch from "@/components/TableSearch";
import {FaFilter} from "react-icons/fa";
import {RiSortAlphabetAsc} from "react-icons/ri";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {isNumeric} from "@/lib/utils";
import {WEB_CLIENT_URL} from "@/lib/data";
import FormModal from "@/components/FormModal";
import {Announcement, Class, Prisma} from "@prisma/client";
import prisma from "@/lib/prisma";
import {ITEMS_PER_PAGE} from "@/lib/config";
import getSessionClaims from "@/lib/getSessionClaims";

type AnnouncementList = Announcement & { class: Class };

const columns = ({role}: { role: string }) => [
    {
        header: 'Title',
        accessor: 'title',
    },
    {
        header: 'Class',
        accessor: 'class',
    },
    {
        header: 'Date',
        accessor: 'date',
        className: 'hidden sm:table-cell',
    },
    ...(['admin'].includes(role) ? [{
        header: 'Actions',
        accessor: 'actions',
    }] : []),
];

export async function generateMetadata() {
    console.log('generateMetadata called');

    const title = 'Announcements';
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

const renderRow = (role: string, {id, title, class: announcementOfClass, date}: AnnouncementList) => {
    return (
        <tr key={id} className={'border-b border-gray-200 even:bg-slate-200 text-sm hover:bg-lamaPurpleLight'}>
            <td className={'flex items-center gap-4 p-4'}>{title}</td>
            <td className={''}>{announcementOfClass?.name || '-'}</td>
            <td className={'hidden sm:table-cell'}>{new Intl.DateTimeFormat('en-US').format(date)}</td>
            <td className={['admin'].includes(role) ? 'flex' : 'hidden'}>
                <div className={'flex items-center gap-2'}>
                    {/** UPDATE */}
                    <FormModal table={'announcement'} type={'update'} id={id}/>

                    {/** DELETE */}
                    <FormModal table={'announcement'} type={'delete'} id={id}/>
                </div>
            </td>
        </tr>
    );
}

async function AnnouncementsPage({searchParams}: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const {role, userId} = await getSessionClaims();

    const {page: rawPage, ...queryParams} = await searchParams || {};
    const page = rawPage ? Number(rawPage) : 1;

    /** URL PARAMS CONDITION */
    const query: Prisma.AnnouncementWhereInput = {};

    if (queryParams) {
        for (let [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                value = Array.isArray(value) ? value[0] : value;

                switch (key) {
                    case 'search':
                        query.title = {contains: value, mode: 'insensitive'};
                        break;
                    default:
                        break;
                }
            }
        }
    }

    /** ROLE CONDITIONS */
    const roleConditions = {
        teacher: {lessons: {some: {teacherId: userId}}},
        student: {students: {some: {id: userId}}},
        parent: {students: {some: {parentId: userId}}},
    };
    query.OR = [
        {classId: null},
        {class: roleConditions[role as keyof typeof roleConditions] || {}},
    ];

    const [announcements, announcementsCount] = await prisma.$transaction([
        prisma.announcement.findMany({
            where: query,
            include: {class: true},
            take: ITEMS_PER_PAGE,   // 10 objects per request
            skip: isNumeric(page) ? ITEMS_PER_PAGE * (Number(page) - 1) : 0,
        }),
        prisma.announcement.count({where: query}),
    ]);

    return (
        <div className={'flex-1 rounded-md p-4 m-4 mt-0'}>
            {/** TOP */}
            <div className={'flex items-center justify-between'}>
                <h1 className={'hidden md:block text-lg font-semibold'}>All Announcements</h1>
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
                            <FormModal table={'announcement'} type={'create'}/>
                        )}
                    </div>
                </div>
            </div>

            {/** LIST */}
            <Table columns={columns({role})} data={announcements} renderRow={(item) => renderRow(role, item)}/>

            {/** PAGINATION */}
            <div className={''}>
                <Pagination page={page} count={announcementsCount}/>
            </div>
        </div>
    );
}

export default AnnouncementsPage;
