"use client"

import {useState} from "react"

export default function Home() {
    const [coins, setCoins] = useState(0);

    const handleBuyCoins = async () => { 
        try {
            const res = await fetch("/api/create-checkout-session",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            
        } catch {
            
        }
    }
    return (
        <div className="p-16 flex flex-col justify-center text-black bg-white gap-5 min-w-3">
            <h1 className="flex justify-center">Saas Coin System</h1>
            <div className="flex justify-center">
                <p>Your Coins: {coins}</p>
            </div>
            <div className="flex flex-col space-y-2">
                <button type="submit" className="bg-green-400 cursor-pointer hover:bg-green-700" onClick={handleBuyCoins}>Buy 10 coins for $5</button>
                <button type="submit" className="bg-orange-300 cursor-pointer hover:bg-amber-700">use 1 coin</button>
            </div>
        </div>
    )
}