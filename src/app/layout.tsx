import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: 'School Management Dashboard',
    description: 'Next.js School Management System',
};

function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang={'en'}>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}

export default RootLayout;
