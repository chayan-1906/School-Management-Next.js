import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import React, {startTransition, useActionState, useEffect} from "react";
import {ClassSchema, classSchema} from "@/lib/formValidationSchemas";
import {createClass, updateClass} from "@/lib/actions";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

function ClassForm({setOpen, type, data, relatedData}: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; type: 'create' | 'update'; data?: any; relatedData?: any }) {
    const {register, handleSubmit, formState: {errors}} = useForm<ClassSchema>({
        resolver: zodResolver(classSchema),
    });
    const router = useRouter();

    const [state, formAction, pending] = useActionState(type === 'create' ? createClass : updateClass, {success: false, error: false});

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        startTransition(() => {
            formAction(data);
        });
    });

    useEffect(() => {
        if (state.success) {
            toast(`Class has been ${type === 'create' ? 'created' : 'updated'}!`);
            setOpen(false);
            router.refresh();
        }
    }, [router, setOpen, state, type]);

    const {grades, teachers} = relatedData;

    return (
        <form className={'flex flex-col gap-8'} onSubmit={onSubmit}>
            <h1 className={'text-xl font-semibold'}>{type === 'create' ? 'Create a new class' : 'Update class'}</h1>

            <div className={'flex flex-wrap gap-4'}>
                {/** CLASS NAME */}
                <InputField label={'Class Name'} register={register} name={'name'} defaultValue={data?.name} error={errors.name} inputProps={{placeholder: 'Enter class name...'}}/>

                {/** CLASS CAPACITY */}
                <InputField label={'Capacity'} type={'number'} register={register} name={'capacity'} defaultValue={data?.capacity} error={errors.capacity}
                            inputProps={{placeholder: 'Enter class capacity...'}}/>

                {/** CLASS ID */}
                {data && (
                    <InputField label={'ID'} register={register} name={'id'} defaultValue={data?.id} error={errors.id} hidden={true}/>
                )}

                {/** SUPERVISOR SELECT */}
                <div className={'flex flex-col w-full md:w-1/4 gap-2'}>
                    <label className={'text-xs text-gray-500'}>Supervisor</label>
                    <select className={'ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'} {...register('supervisorId')} defaultValue={data?.teachers}>
                        {teachers?.map(
                            (teacher: { id: string; name: string; surname: string; }) => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name} {teacher.surname}</option>
                            )
                        )}
                    </select>
                    {errors.supervisorId?.message && (
                        <p className={'text-xs text-red-400'}>{errors.supervisorId.message.toString()}</p>
                    )}
                </div>

                {/** GRADE SELECT */}
                <div className={'flex flex-col w-full md:w-1/4 gap-2'}>
                    <label className={'text-xs text-gray-500'}>Grade</label>
                    <select className={'ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'} {...register('gradeId')} defaultValue={data?.gradeId}>
                        {grades?.map(
                            (grade: { id: number; level: string; }) => (
                                <option key={grade.id} value={grade.id}>{grade.level}</option>
                            )
                        )}
                    </select>
                    {errors.gradeId?.message && (
                        <p className={'text-xs text-red-400'}>{errors.gradeId.message.toString()}</p>
                    )}
                </div>
            </div>

            {state.error && (
                <span className={'text-red-500'}>Something went wrong!</span>
            )}

            <button className={'bg-blue-400 text-white p-2 rounded-md'}>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    );
}

export default ClassForm;
