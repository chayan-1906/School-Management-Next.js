import React from "react";
import Link from "next/link";
import {routes} from "@/lib/routes";
import Image from "next/image";
import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";

function DashboardLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={'h-full flex'}>
            {/** LEFT */}
            <div className={'w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'}>
                <Link href={routes.homePath} className={'flex items-center justify-center lg:justify-start gap-2'}>
                    <Image src={'/logo.png'} alt={'logo'} width={32} height={32}/>
                    <span className={'hidden lg:block font-bold'}>Oakwood Academy</span>
                </Link>
                <Menu/>
            </div>

            {/** RIGHT */}
            <div className={'w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] flex flex-col bg-[#F7F8FA] overflow-scroll'}>
                <Navbar/>
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
