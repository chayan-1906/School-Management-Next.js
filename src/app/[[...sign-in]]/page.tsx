'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import Image from "next/image";
import {useUser} from "@clerk/nextjs";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {routes} from "@/lib/routes";

function LoginPage() {
    const {isLoaded, isSignedIn, user} = useUser();
    const router = useRouter();

    useEffect(() => {
        const role = user?.publicMetadata.role?.toString(); // admin, teacher, student, parent

        if (role) {
            router.replace(routes.rolePath(role));
        }
    }, [router, user]);

    return (
        <div className={'h-screen flex items-center justify-center bg-lamaSkyLight'}>
            <SignIn.Root>
                <SignIn.Step name={'start'} className={'flex flex-col gap-2 w-5/6 sm:w-2/3 md:w-1/3 bg-white p-12 rounded-md shadow-lamaSky shadow-2xl drop-shadow-2xl'}>
                    <div className={'flex items-center justify-center gap-2 text-xl font-bold'}>
                        <Image src={'/logo.png'} alt={'logo'} height={24} width={24}/>
                        Oakwood Academy
                    </div>
                    <h2 className={'text-gray-400 text-center'}>Sign in to your account</h2>

                    <Clerk.GlobalError className={'text-sm text-red-400'}/>

                    {/** username */}
                    <Clerk.Field name={'identifier'} className={'flex flex-col gap-2'}>
                        <Clerk.Label className={'text-xs text-gray-500'}>Username</Clerk.Label>
                        <Clerk.Input type={'text'} required className={'p-2 rounded-md ring-1 ring-gray-300'}/>
                        <Clerk.FieldError className={'text-xs text-red-500'}/>
                    </Clerk.Field>

                    {/** password */}
                    <Clerk.Field name={'password'} className={'flex flex-col gap-2'}>
                        <Clerk.Label className={'text-xs text-gray-500'}>Password</Clerk.Label>
                        <Clerk.Input type={'password'} required className={'p-2 rounded-md ring-1 ring-gray-300'}/>
                        <Clerk.FieldError className={'text-xs text-red-500'}/>
                    </Clerk.Field>

                    <SignIn.Action submit className={'bg-blue-400 text-white my-1 rounded-md text-sm p-[10px]'}>Sign In</SignIn.Action>
                </SignIn.Step>
            </SignIn.Root>
        </div>
    );
}

export default LoginPage;
