import {z} from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, {message: 'Subject Name is required!'}),
    teachers: z.array(z.string()),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, {message: 'Subject Name is required!'}),
    capacity: z.coerce.number().min(1, {message: 'Capacity is required!'}),
    gradeId: z.coerce.number().min(1, {message: 'Grade is required!'}),
    supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
    id: z.string().optional(),
    username: z.string()
        .min(3, {message: 'Username must be of at least 3 characters long!'})
        .max(20, {message: 'Username must be of at most 20 characters long!'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long!'}),
    name: z.string().min(1, {message: 'First Name is required!'}),
    surname: z.string().optional(),
    email: z.string().email({message: 'Invalid email address!'}).optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    bloodType: z.string().min(1, {message: 'Blood type is required!'}),
    birthday: z.coerce.date({message: 'Birthday is required!'}),
    sex: z.enum(['MALE', 'FEMALE', 'OTHER'], {message: 'Gender is required!'}),
    subjects: z.array(z.string()).optional(),   // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;
