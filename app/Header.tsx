import { getServerSession } from "next-auth/next";
import Image from "next/image"
import Link from "next/link"
import LogoutButton from "./LogoutButton";

async function Header() {
    const session = await getServerSession();

    if (session) return(
        
    <header className="sticky top-0 bg-white z-50 flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
            <Image 
                className="rounded-full mx-2 object-contain"
                src={session.user?.image!}
                alt='Profile'
                width={50}
                height={10}
            />

            <div>
                <p className="text-blue-400">Logged in as:</p>
                <p className="font-bold text-lg">{session.user?.name}</p>
            </div>
        </div>

        <LogoutButton/>
    </header>
    )


  return (
    <header className="sticky top-0 bg-white z-50 flex justify-center items-center p-10 shadow-sm">
        <div className="flex flex-col items-center space-y-5">
            <div className="flex space-x-2 items-center">
                <Image src='https://links.papareact.com/jne' alt="Profile Pic" 
                    width={50} 
                    height={10}
                />

                <p className="text-blue-400">Welcome to Meta Messenger</p>
            </div>

            <Link href='/auth/signin' className="text-white 
                bg-blue-500 
                hover:bg-blue-700 
                font-bold py-2 
                px-4 rounded">
            Sign In</Link>
        </div>
    </header>
  )
}

export default Header