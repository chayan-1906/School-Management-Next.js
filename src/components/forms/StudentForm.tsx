import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import React from "react";
import Image from "next/image";

const studentSchema = z.object({
    username: z.string()
        .min(3, {message: 'Username must be of at least 3 characters long!'})
        .max(20, {message: 'Username must be of at most 20 characters long!'}),
    email: z.string().email({message: 'Invalid email!'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long!'}),
    firstName: z.string().min(1, {message: 'First Name is required!'}),
    lastName: z.string().min(1, {message: 'Last Name is required!'}),
    phone: z.string().min(1, {message: 'Phone is required!'}),
    address: z.string().min(1, {message: 'Address is required!'}),
    bloodType: z.string().min(1, {message: 'Blood type is required!'}),
    birthday: z.date({message: 'Birthday is required!'}),
    sex: z.enum(['male', 'female', 'others'], {message: 'Gender is required!'}),
    img: z.instanceof(File, {message: 'Image is required!'}),
});

type Inputs = z.infer<typeof studentSchema>;

function StudentForm({type, data}: { type: 'create' | 'update'; data?: any; }) {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        resolver: zodResolver(studentSchema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className={'flex flex-col gap-8'} onSubmit={onSubmit}>
            <h1 className={'text-xl font-semibold'}>Create a new student</h1>

            {/** AUTHENTICATION INFO */}
            <div className={'flex items-center gap-4'}>
                <hr className={'flex-1'}/>
                <span className={'text-gray-500 font-medium'}>Authentication Information</span>
                <hr className={'flex-1'}/>
            </div>
            <div className={'flex justify-between flex-wrap gap-4'}>
                <InputField label={'Username'} register={register} name={'username'} defaultValue={data?.username} error={errors.username}/>
                <InputField label={'Email'} register={register} name={'email'} type={'email'} defaultValue={data?.email} error={errors.email}/>
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
                <InputField label={'First Name'} register={register} name={'firstName'} defaultValue={data?.firstName} error={errors.firstName}/>

                {/** LAST NAME */}
                <InputField label={'Last Name'} register={register} name={'lastName'} defaultValue={data?.lastName} error={errors.lastName}/>

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
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                        <option value={'others'}>Others</option>
                    </select>
                    {errors.sex?.message && (
                        <p className={'text-xs text-red-500'}>{errors.sex.message.toString()}</p>
                    )}
                </div>

                {/** UPLOAD IMAGE */}
                <div className={'flex flex-col gap-2 w-full md:w-1/4 items-center justify-center'}>
                    <label className={'text-xs text-gray-500 flex items-center gap-2 cursor-pointer'} htmlFor={'img'}>
                        <Image src={'/upload.png'} alt={'upload'} height={28} width={28}/>
                        <span>Upload a photo</span>
                    </label>
                    <input id={'img'} type={'file'} {...register('img')} className={'hidden'}/>
                    {errors.img?.message && (
                        <p className={'text-xs text-red-500'}>{errors.img.message.toString()}</p>
                    )}
                </div>
            </div>
            <button className={'bg-blue-400 text-white p-2 rounded-md'}>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    );
}

export default StudentForm;
