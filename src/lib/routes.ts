export const routes = {
    homePath: '/',
    teachersPath: '/list/teachers',
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

    teacherPath: (id: number) => `/list/teachers/${id}`
};
