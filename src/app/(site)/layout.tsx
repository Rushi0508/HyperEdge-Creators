import getCurrentUser from "../actions/getCurrentUser"
import Navbar from "../components/Navbar"
import SearchBar from "./components/SearchBar";

async function layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-14">
        <div className="text-2xl font-semibold my-4">Hi, {user?.fullName} 👋</div>
        <div className='my-5 w-3/5'>
          <SearchBar />
        </div>
        {children}
      </div>
    </>
  )
}

export default layout