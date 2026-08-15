"use client"
import { useEffect, useState } from "react"

export default function Home() {

    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(localStorage.getItem("userName") || "");
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 text-center">
                <div className="text-5xl mb-4"></div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    {userName ? `Welcome, ${userName}!` : "Welcome!"}
                </h1>
                <p className="text-gray-500">Glad to have you here.</p>
            </div>
        </div>
    )
}
