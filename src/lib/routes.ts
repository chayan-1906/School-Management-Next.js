import {isStringInvalid} from "@/lib/utils";

export const routes = {
    homePath: '/',
    teachersPath: ({classId}: { classId?: number }) => {
        let url = `/list/teachers`;
        let queryParams = [];

        if (!isStringInvalid(classId)) {
            queryParams.push(`classId=${classId}`);
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }
        return url;
    },
    studentsPath: '/list/students',
    parentsPath: '/list/parents',
    subjectsPath: '/list/subjects',
    classesPath: '/list/classes',
    lessonsPath: '/list/lessons',
    examsPath: '/list/exams',
    assignmentsPath: '/list/assignments',
    resultsPath: '/list/results',
    attendancePath: '/list/attendance',
    eventsPath: '/list/events',
    messagesPath: '/list/messages',
    announcementsPath: '/list/announcements',

    teacherPath: (id: number | string, {page}: { page?: number }) => {
        let url = `/list/teachers/${id}`;
        let queryParams = [];

        if (!isStringInvalid(page)) {
            queryParams.push(`page=${page}`);
        }
        return url;
    },
    studentPath: (id: number | string) => `/list/students/${id}`,
};
