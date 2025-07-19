import Navbar from "@/components/navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className='container py-10'>{children}</main>
        </>

    )
}
