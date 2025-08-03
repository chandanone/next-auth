"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import {  signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

export default function Header() {
    const {data: session, status} = useSession();
    const [initialLoading, setIntitalLoading] = useState<boolean>(true);

    useEffect(()=>{
        if (status === "loading") {
            setIntitalLoading(false);
        }
    },[session, status])

    return (
        <div className="fixed top-0 w-full h-[60px] bg-black border-b border-white/60 p-3 flex flex-row justify-between items-center z-50">
            
            <div>
                <Link href="/">
                    <h2 className="text-xl font-bold">TxI</h2>
                </Link>
            </div>
            
            <div className="flex flex-row space-x-4 ml-2">
                {initialLoading && status === "loading" ? <BiLoaderCircle className="animate-spin" /> : 
                !session ? (
                    <>
                        <div className="_menu">
                            <Link href="/signup"><Button>Signup</Button></Link>
                        </div>
                        <div className="_menu">
                            <Link href="/api/auth/signin"><Button>SignIn</Button></Link>
                        </div>
                        <div className="_menu">
                            <Link href="/projects"><Button>Projects</Button></Link>
                        </div>
                    </>                    
                ) : (
                    <>
                    <div className="_menu">
                        <Button onClick={()=>signOut({ callbackUrl: "/" })}>Logout</Button>
                    </div>
                    
                        <h1>{session.user?.email}</h1>
                    <Link href="/profile">
                        <Avatar>
                            <AvatarImage src={session.user?.image || ""} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>                    
                    </Link>
                    </>
                )
            }
                
            </div>            
        </div>
    )
}