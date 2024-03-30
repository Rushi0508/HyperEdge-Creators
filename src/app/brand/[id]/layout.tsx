import Navbar from "../../components/Navbar";

async function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="max-w-screen-2xl mx-auto mt-10 px-28">{children}</div>
        </>
    );
}

export default layout;
