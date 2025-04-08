import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import React, {startTransition, useActionState, useEffect} from "react";
import {subjectSchema, SubjectSchema} from "@/lib/formValidationSchemas";
import {createSubject, updateSubject} from "@/lib/actions";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

function SubjectForm({setOpen, type, data, relatedData}: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; type: 'create' | 'update'; data?: any; relatedData?: any; }) {
    const {register, handleSubmit, formState: {errors}} = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
    });
    const router = useRouter();

    const [state, formAction, pending] = useActionState(type === 'create' ? createSubject : updateSubject, {success: false, error: false});

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        startTransition(() => {
            formAction(data);
        });
    });

    useEffect(() => {
        if (state.success) {
            toast(`Subject has been ${type === 'create' ? 'created' : 'updated'}!`);
            setOpen(false);
            router.refresh();
        }
    }, [router, setOpen, state, type]);

    const {teachers} = relatedData;

    return (
        <form className={'flex flex-col gap-8'} onSubmit={onSubmit}>
            <h1 className={'text-xl font-semibold'}>{type === 'create' ? 'Create a new subject' : 'Update subject'}</h1>

            <div className={'flex flex-wrap gap-4'}>
                {/** SUBJECT NAME */}
                <InputField label={'Subject Name'} register={register} name={'name'} defaultValue={data?.name} error={errors.name} inputProps={{placeholder: 'Enter subject name...'}}/>

                {/** SUBJECT ID */}
                {data && (
                    <InputField label={'ID'} register={register} name={'id'} defaultValue={data?.id} error={errors.id} hidden={true}/>
                )}

                {/** TEACHERS SELECT */}
                <div className={'flex flex-col w-full md:w-1/4 gap-2'}>
                    <label className={'text-xs text-gray-500'}>Teachers</label>
                    <select multiple className={'ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'} {...register('teachers')} defaultValue={data?.teachers}>
                        {teachers?.map(
                            (teacher: { id: string; name: string; surname: string; }) => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name} {teacher.surname}</option>
                            )
                        )}
                    </select>
                    {errors.teachers?.message && (
                        <p className={'text-xs text-red-400'}>{errors.teachers.message.toString()}</p>
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

export default SubjectForm;
