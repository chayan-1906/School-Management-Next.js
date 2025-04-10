import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import React, {startTransition, useActionState, useEffect} from "react";
import {examSchema, ExamSchema} from "@/lib/formValidationSchemas";
import {createExam, updateExam} from "@/lib/actions";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

function ExamForm({setOpen, type, data, relatedData}: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; type: 'create' | 'update'; data?: any; relatedData?: any; }) {
    const {register, handleSubmit, formState: {errors}} = useForm<ExamSchema>({
        resolver: zodResolver(examSchema),
    });
    const router = useRouter();

    const [state, formAction, pending] = useActionState(type === 'create' ? createExam : updateExam, {success: false, error: false});

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        startTransition(() => {
            formAction(data);
        });
    });

    useEffect(() => {
        if (state.success) {
            toast(`Exam has been ${type === 'create' ? 'created' : 'updated'}!`);
            setOpen(false);
            router.refresh();
        }
    }, [router, setOpen, state, type]);

    const {lessons} = relatedData;

    return (
        <form className={'flex flex-col gap-8'} onSubmit={onSubmit}>
            <h1 className={'text-xl font-semibold'}>{type === 'create' ? 'Create a new exam' : 'Update exam'}</h1>

            <div className={'flex flex-wrap justify-between gap-4'}>
                {/** EXAM TITLE */}
                <InputField label={'Exam Title'} register={register} name={'title'} defaultValue={data?.title} error={errors.title} inputProps={{placeholder: 'Enter exam title...'}}/>

                {/** EXAM START TIME */}
                <InputField label={'Start Time'} register={register} name={'startTime'} type={'datetime-local'} defaultValue={data?.startTime.toISOString().slice(0, 16)}
                            error={errors.startTime} inputProps={{placeholder: 'Enter start time...'}}/>

                {/** EXAM END TIME */}
                <InputField label={'End Time'} register={register} name={'endTime'} type={'datetime-local'} defaultValue={data?.endTime.toISOString().slice(0, 16)} error={errors.endTime}
                            inputProps={{placeholder: 'Enter end time...'}}/>

                {/** EXAM ID */}
                {data && (
                    <InputField label={'ID'} register={register} name={'id'} defaultValue={data?.id} error={errors.id} hidden={true}/>
                )}

                {/** LESSONS SELECT */}
                <div className={'flex flex-col w-full md:w-1/4 gap-2'}>
                    <label className={'text-xs text-gray-500'}>Lessons</label>
                    <select className={'ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'} {...register('lessonId')} defaultValue={data?.lessonId}>
                        {lessons?.map(
                            (lesson: { id: string; subject: { id: number; name: string; } }) => (
                                <option key={lesson.id} value={lesson.id}>{lesson.subject.name}</option>
                            )
                        )}
                    </select>
                    {errors.lessonId?.message && (
                        <p className={'text-xs text-red-400'}>{errors.lessonId.message.toString()}</p>
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

export default ExamForm;
