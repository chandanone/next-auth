"use client"
import * as z from "zod"

//define form schema
const formSchema = z.object({
    email: z.string().email({message: "Invelid Email Address"}),
    password: z.string().min(6, {message: "Password must be min 6"})
})
 export default function SignUpform(){

  
    return(
        <div>
            <form>
                <label htmlFor="email">Email</label>
            </form>
        </div>
    )
 }