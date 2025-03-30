'use client';

import {cn} from "@/lib/utils";
import {FaTrashCan} from "react-icons/fa6";
import React, {useCallback, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import {IoClose} from "react-icons/io5";
import TeacherForm from "@/components/forms/TeacherForm";

function FormModal({table, type, data, id}: {
    table: 'teacher' | 'student' | 'parent' | 'subject' | 'class' | 'lesson' | 'exam' | 'assignment' | 'result' | 'attendance' | 'event' | 'announcement';
    type: 'create' | 'update' | 'delete';
    data?: any;
    id?: number;
}) {
    const size = type === 'create' ? 'size-8' : 'size-7';
    const bgColor = type === 'create' ? 'bg-lamaYellow' : type === 'update' ? 'bg-lamaSky' : 'bg-lamaRedLight';

    const [open, setOpen] = useState(false);

    const toggleModal = useCallback(() => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [open]);

    const getIcon = () => {
        return (
            (() => {
                if (type === 'create') {
                    return <FaPlus size={12}/>;
                } else if (type === 'update') {
                    return <MdEdit color={'white'}/>;
                } else if (type === 'delete') {
                    return <FaTrashCan color={'white'}/>;
                }
            })()
        );
    }

    const Form = () => {
        return (type === 'delete' && id) ? (
            <form action={''} className={'flex flex-col gap-4 p-4'}>
                <span className={'text-center font-medium'}>All data will be lost; Are you sure you want to delete this {table}?</span>
                <button className={'bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center'}>Delete</button>
            </form>
        ) : (
            <TeacherForm type={'create'}/>
        );
    }

    return (
        <>
            <button className={cn('flex items-center justify-center rounded-full', bgColor, size)} onClick={toggleModal}>
                {getIcon()}
            </button>
            {open && (
                <div className={'absolute flex items-center justify-center w-screen h-screen left-0 top-0 bg-black bg-opacity-60 z-50'}>
                    <div className={'relative  w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] bg-white p-4 rounded-md'}>
                        <Form/>
                        <div className={'absolute top-4 right-4 cursor-pointer'}>
                            <IoClose size={20} onClick={toggleModal}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FormModal;
