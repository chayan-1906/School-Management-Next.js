import prisma from "@/lib/prisma";
import BigCalendar from "@/components/BigCalendar";
import {adjustScheduleToCurrentWeek} from "@/lib/utils";

async function BigCalendarContainer({type, id}: { type: 'teacherId' | 'classId'; id: string | number; }) {
    const data = await prisma.lesson.findMany({
        where: {
            ...(type === 'teacherId' ? {teacherId: id as string} : {classId: id as number}),
        },
    });

    const lessons = data.map((lesson) => ({
        title: lesson.name,
        start: lesson.startTime,
        end: lesson.endTime,
    }));
    console.log(lessons);

    const schedule = adjustScheduleToCurrentWeek(lessons);

    return (
        <div>
            <BigCalendar data={schedule}/>
        </div>
    );
}

export default BigCalendarContainer;
