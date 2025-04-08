'use server';

import {ClassSchema, SubjectSchema} from "@/lib/formValidationSchemas";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {routes} from "@/lib/routes";

type CurrentState = { success: boolean, error: boolean };

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

export const createClass = async (currentState: CurrentState, data: ClassSchema) => {
    console.log(data, 'in createClass server action');
    try {
        await prisma.class.create({
            data,
        });

        // revalidatePath(routes.subjectsPath);
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
