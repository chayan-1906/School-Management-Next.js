'use server';

import {ClassSchema, SubjectSchema, TeacherSchema} from "@/lib/formValidationSchemas";
import prisma from "@/lib/prisma";
import {clerkClient} from "@clerk/nextjs/server";

type CurrentState = { success: boolean, error: boolean; message?: string | undefined; };

/** SUBJECT */
export const createSubject = async (currentState: CurrentState, data: SubjectSchema) => {
    console.log(data, 'in createSubject server action');
    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map((teacherId: string) => ({id: teacherId}))
                },
            },
        });

        // revalidatePath(routes.subjectsPath);
        return {success: true, error: false};
    } catch (error) {
        console.error('error in createSubject:', error);
        return {success: false, error: true};
    }
}

export const updateSubject = async (currentState: CurrentState, data: SubjectSchema) => {
    console.log(data, 'in updateSubject server action');
    try {
        await prisma.subject.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map((teacherId: string) => ({id: teacherId})),
                },
            },
        });

        // revalidatePath(routes.subjectsPath);
        return {success: true, error: false};
    } catch (error) {
        console.error('error in createSubject:', error);
        return {success: false, error: true};
    }
}

export const deleteSubject = async (currentState: CurrentState, data: FormData) => {
    console.log(data, 'in deleteSubject server action');
    const id = data.get('id') as string;
    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath(routes.subjectsPath);
        return {success: true, error: false};
    } catch (error) {
        console.error('error in createSubject:', error);
        return {success: false, error: true};
    }
}

/** CLASS */
export const createClass = async (currentState: CurrentState, data: ClassSchema) => {
    console.log(data, 'in createClass server action');
    try {
        await prisma.class.create({
            data,
        });

        // revalidatePath(routes.classesPath({}));
        return {success: true, error: false};
    } catch (error) {
        console.error('error in createClass:', error);
        return {success: false, error: true};
    }
}

export const updateClass = async (currentState: CurrentState, data: ClassSchema) => {
    console.log(data, 'in updateClass server action');
    try {
        await prisma.class.update({
            where: {
                id: data.id,
            },
            data,
        });

        // revalidatePath(routes.classesPath({}));
        return {success: true, error: false};
    } catch (error) {
        console.error('error in updateClass:', error);
        return {success: false, error: true};
    }
}

export const deleteClass = async (currentState: CurrentState, data: FormData) => {
    console.log(data, 'in deleteClass server action');
    const id = data.get('id') as string;
    try {
        await prisma.class.delete({
            where: {
                id: parseInt(id),
            },
        });

        // revalidatePath(routes.classesPath({}));
        return {success: true, error: false};
    } catch (error) {
        console.error('error in deleteClass:', error);
        return {success: false, error: true};
    }
}

/** TEACHER */
export const createTeacher = async (currentState: CurrentState, data: TeacherSchema) => {
    console.log(data, 'in createTeacher server action');
    try {
        const client = await clerkClient();
        const {username, email, password, name, surname, phone, address, img, bloodType, sex, birthday, subjects} = data || {};
        try {
            const user = await client.users.createUser({
                username, password,
                emailAddress: [email ?? ''],
                firstName: name,
                lastName: surname,
                publicMetadata: {role: 'teacher'},
            });

            await prisma.teacher.create({
                data: {
                    id: user.id, username, name, surname, email, phone, address, img, bloodType, sex, birthday, subjects: {
                        connect: subjects?.map((subjectId: string) => ({id: parseInt(subjectId)})),
                    },
                },
            });
        } catch (error: any) {
            if (error.errors.isNotEmpty && error.errors[0].code === 'form_identifier_exists') {
                return {success: false, error: true, message: 'Username already exists'};
            }
            console.error('error in creating clerk user:', JSON.stringify(error.errors, null, 2));
        }

        /*const user = await client.users.createUser({
            username: 'test',
            password: 'testtesttest',
            emailAddress: ['test@gmail.com'],
        });*/

        // revalidatePath(routes.teachersPath({}));
        return {success: true, error: false, message: ''};
    } catch (error) {
        console.error('error in createTeacher:', error);
        return {success: false, error: true, message: ''};
    }
}

export const updateTeacher = async (currentState: CurrentState, data: TeacherSchema) => {
    console.log(data, 'in updateTeacher server action');
    try {
        const client = await clerkClient();
        const {id, username, email, password, name, surname, phone, address, img, bloodType, sex, birthday, subjects} = data || {};
        if (!id) {
            return {success: true, error: false, message: 'No user found!'};
        }
        const user = await client.users.updateUser(id, {
            username,
            ...(password !== '' && {password}),
            firstName: name,
            lastName: surname,
            // publicMetadata: {role: 'teacher'},
        });

        await prisma.teacher.update({
            where: {id},
            data: {
                ...(password !== '' && {password}),
                username, name, surname, email, phone, address, img, bloodType, sex, birthday, subjects: {
                    connect: subjects?.map((subjectId: string) => ({id: parseInt(subjectId)})),
                },
            },
        });

        // revalidatePath(routes.teachersPath({}));
        return {success: true, error: false, message: ''};
    } catch (error) {
        console.error('error in updateTeacher:', error);
        return {success: false, error: true, message: ''};
    }
}

export const deleteTeacher = async (currentState: CurrentState, data: FormData) => {
    console.log(data, 'in deleteTeacher server action');
    const id = data.get('id') as string;
    try {
        await prisma.teacher.delete({
            where: {
                id,
            },
        });

        // revalidatePath(routes.teachersPath({}));
        return {success: true, error: false};
    } catch (error) {
        console.error('error in deleteTeacher:', error);
        return {success: false, error: true};
    }
}
