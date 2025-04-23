import type { Metadata } from 'next'
import './globals.css'
import TheHeader from '@/components/generics/TheHeader'
import TheFooter from '@/components/generics/TheFooter'
import ReduxProvider from './reduxProvider'
import { ApiProvider } from '@/components/ApiProvider'

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
            <ReduxProvider>
                <ApiProvider>
                    <body className="font-vietnam flex flex-col min-h-[100vh] overflow-x-hidden text-white">
                        <TheHeader />
                        <main className="flex flex-col bg-main-dark grow basis-0">
                            {children}
                        </main>
                        <TheFooter />
                    </body>
                </ApiProvider>
            </ReduxProvider>
        </html>
    )
}
