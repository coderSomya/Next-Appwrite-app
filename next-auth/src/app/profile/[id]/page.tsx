export default function UserProfile({params} : any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl">
   <h1>Profile</h1>
       <hr />

       <span className="p-2 rounded bg-orange-500 text-2xl"> 
       <b> {params.id}</b>
       </span>
        </div>
    )
}