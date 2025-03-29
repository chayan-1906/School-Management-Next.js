import "./globals.css";
import React from "react";
import {Inter} from "next/font/google";
import {APP_LOGO_URL, APP_NAME, APP_TAGLINE, metadataKeywords, WEB_CLIENT_URL} from "@/lib/data";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: {
        absolute: '',
        default: `${APP_NAME} | ${APP_TAGLINE}`,
        template: `%s | ${APP_NAME}`,
    },
    description: APP_NAME,
    /*image: {
        url: APP_LOGO_URL,
        alt: `${APP_NAME}-logo`,
        width: 400,
        height: 210,
    },*/
    icons: {
        // apple: [{url: APP_LOGO_URL}],
    },
    // url: WEB_CLIENT_URL,
    keywords: metadataKeywords,
    // type: 'website',
    openGraph: {
        title: `${APP_NAME} | ${APP_TAGLINE}`,
        description: APP_TAGLINE,
        images: [
            {
                url: APP_LOGO_URL,
                alt: `${APP_NAME}-logo`,
                width: 400,
                height: 210,
            },
        ],
        url: WEB_CLIENT_URL,
        type: 'website',
    },
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
