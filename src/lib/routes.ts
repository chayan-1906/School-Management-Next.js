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
    studentsPath: ({teacherId}: { teacherId?: string }) => {
        let url = `/list/students`;
        let queryParams = [];

        if (!isStringInvalid(teacherId)) {
            queryParams.push(`teacherId=${teacherId}`);
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }
        return url;
    },
    parentsPath: '/list/parents',
    subjectsPath: '/list/subjects',
    classesPath: ({supervisorId}: { supervisorId?: string }) => {
        let url = `/list/classes`;
        let queryParams = [];

        if (!isStringInvalid(supervisorId)) {
            queryParams.push(`supervisorId=${supervisorId}`);
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }
        return url;
    },
    lessonsPath: ({teacherId, classId}: { teacherId?: string; classId?: number }) => {
        let url = `/list/lessons`;
        let queryParams = [];

        if (!isStringInvalid(teacherId)) {
            queryParams.push(`teacherId=${teacherId}`);
        }

        if (!isStringInvalid(classId)) {
            queryParams.push(`classId=${classId}`);
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }
        return url;
    },
    examsPath: ({teacherId, classId}: { teacherId?: string; classId?: number }) => {
        let url = `/list/exams`;
        let queryParams = [];

        if (!isStringInvalid(teacherId)) {
            queryParams.push(`teacherId=${teacherId}`);
        }

        if (!isStringInvalid(classId)) {
            queryParams.push(`classId=${classId}`);
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }
        return url;
    },
    assignmentsPath: ({teacherId, classId}: { teacherId?: string; classId?: number }) => {
        let url = `/list/assignments`;
        let queryParams = [];

        if (!isStringInvalid(teacherId)) {
            queryParams.push(`teacherId=${teacherId}`);
        }

        if (!isStringInvalid(classId)) {
            queryParams.push(`classId=${classId}`);
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }
        return url;
    },
    resultsPath: ({studentId}: { studentId?: string }) => {
        let url = `/list/results`;
        let queryParams = [];

        if (!isStringInvalid(studentId)) {
            queryParams.push(`studentId=${studentId}`);
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }
        return url;
    },
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
