
export default function SignUp(){
  
    return (
        <div className="mt-50 text-center border-white flex flex-col justify-center items-center g-4 space-y-10">
            <h1>SignUp Form</h1>
            
            <form className="space-y-8" action="createuser" method="post">
                 <div>
                     <label htmlFor="username">Username:  </label>
                    <input type="text" name="username" id="username" placeholder="Enter Username..." />
                </div>
               <div>
                    <label htmlFor="useremail">Useremail:  </label>
                    <input type="email" name="useremail" id="useremail" placeholder="Enter Email..." />
               </div>            
               <button className="border-4 border-yellow-400 rounded-2xl p-4" type="submit">SignUp</button>
                
            </form>
             
        </div>
    )
}