import type { Metadata } from 'next'
import './globals.css'
import TheHeader from '@/components/generics/TheHeader'
import TheFooter from '@/components/generics/TheFooter'

export const metadata: Metadata = {
    title: 'UP Computer Science Guild',
    description: 'Official website of the UP Computer Science Guild',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="font-vietnam flex flex-col overflow-x-hidden">
                <TheHeader />
                <main className="flex flex-col gap-16 bg-main-dark grow basis-0 pb-16">
                    {children}
                </main>
                <TheFooter />
            </body>
        </html>
    )
}
