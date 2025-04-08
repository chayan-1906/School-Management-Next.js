import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import React, {startTransition, useActionState, useEffect, useState} from "react";
import {teacherSchema, TeacherSchema} from "@/lib/formValidationSchemas";
import {useRouter} from "next/navigation";
import {createTeacher, updateTeacher} from "@/lib/actions";
import {toast} from "react-toastify";
import {CldUploadWidget} from "next-cloudinary";
import Image from "next/image";

function TeacherForm({setOpen, type, data, relatedData}: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; type: 'create' | 'update'; data?: any; relatedData?: any; }) {
    const {register, handleSubmit, formState: {errors}} = useForm<TeacherSchema>({
        resolver: zodResolver(teacherSchema),
    });
    const router = useRouter();
    const [img, setImg] = useState<any>();

    const [state, formAction, pending] = useActionState(type === 'create' ? createTeacher : updateTeacher, {success: false, error: false});

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        startTransition(() => {
            formAction({...data, img: img?.secure_url});
        });
    });

    useEffect(() => {
        if (state.success) {
            toast(`Teacher has been ${type === 'create' ? 'created' : 'updated'}!`);
            setOpen(false);
            router.refresh();
        }
    }, [router, setOpen, state, type]);

    const {subjects} = relatedData;

    return (
        <form className={'flex flex-col gap-8'} onSubmit={onSubmit}>
            <h1 className={'text-xl font-semibold'}>{type === 'create' ? 'Create a new teacher' : 'Update teacher'}</h1>

            {/** AUTHENTICATION INFO */}
            <div className={'flex items-center gap-4'}>
                <hr className={'flex-1'}/>
                <span className={'text-gray-500 font-medium'}>Authentication Information</span>
                <hr className={'flex-1'}/>
            </div>
            <div className={'flex justify-between flex-wrap gap-4'}>
                {/** USERNAME */}
                <InputField label={'Username'} register={register} name={'username'} defaultValue={data?.username} error={errors.username}/>

                {/** EMAIL ADDRESS */}
                <InputField label={'Email'} register={register} name={'email'} type={'email'} defaultValue={data?.email} error={errors.email}/>

                {/** PASSWORD */}
                <InputField label={'Password'} register={register} name={'password'} type={'password'} defaultValue={data?.password} error={errors.password}/>
            </div>

            {/** PERSONAL INFO */}
            <div className={'flex items-center gap-4'}>
                <hr className={'flex-1'}/>
                <span className={'text-gray-500 font-medium'}>Personal Information</span>
                <hr className={'flex-1'}/>
            </div>
            <div className={'flex justify-between flex-wrap gap-4'}>
                {/** FIRST NAME */}
                <InputField label={'First Name'} register={register} name={'name'} defaultValue={data?.name} error={errors.name}/>

                {/** LAST NAME */}
                <InputField label={'Last Name'} register={register} name={'surname'} defaultValue={data?.surname} error={errors.surname}/>

                {/** PHONE */}
                <InputField label={'Phone'} register={register} name={'phone'} type={'phone'} defaultValue={data?.phone} error={errors.phone}/>

                {/** ADDRESS */}
                <InputField label={'Address'} register={register} name={'address'} defaultValue={data?.address} error={errors.address}/>

                {/** BLOOD TYPE */}
                <InputField label={'Blood Type'} register={register} name={'bloodType'} defaultValue={data?.bloodType} error={errors.bloodType}/>

                {/** BIRTHDAY */}
                <InputField label={'Birthday'} register={register} name={'birthday'} type={'date'} defaultValue={data?.birthday} error={errors.birthday}/>

                {/** GENDER */}
                <div className={'flex flex-col gap-2 w-full md:w-1/4'}>
                    <label className={'text-xs text-gray-500'}>Gender</label>
                    <select className={'ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'} {...register('sex')} defaultValue={data?.sex}>
                        <option value={'MALE'}>Male</option>
                        <option value={'FEMALE'}>Female</option>
                        <option value={'OTHER'}>Other</option>
                    </select>
                    {errors.sex?.message && (
                        <p className={'text-xs text-red-500'}>{errors.sex.message.toString()}</p>
                    )}
                </div>

                {/** SUBJECTS */}
                <div className={'flex flex-col gap-2 w-full md:w-1/4'}>
                    <label className={'text-xs text-gray-500'}>Subjects</label>
                    <select multiple className={'ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'} {...register('subjects')} defaultValue={data?.subjects}>
                        {subjects?.map(
                            (subject: { id: number; name: string; }) => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            )
                        )}
                    </select>
                    {errors.subjects?.message && (
                        <p className={'text-xs text-red-500'}>{errors.subjects.message.toString()}</p>
                    )}
                </div>

                {/** UPLOAD IMAGE */}
                <CldUploadWidget uploadPreset={'oakwood-academy'} onSuccess={(result, {widget}) => (setImg(result.info), widget.close())}>
                    {({open}) => {
                        return (
                            <div className={'flex items-center gap-2 cursor-pointer ring-[1.5px] ring-gray-300 rounded-md p-2 text-xs text-gray-500'} onClick={() => open()}>
                                <Image src={img?.secure_url || '/upload.png'} alt={'upload-image'} height={28} width={28}/>
                                <span>Upload a photo</span>
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </div>

            {state.error && (
                <span className={'text-red-500'}>{String(state.message || 'Something went wrong!')}</span>
            )}

            <button className={'bg-blue-400 text-white p-2 rounded-md'}>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    );
}

export default TeacherForm;
