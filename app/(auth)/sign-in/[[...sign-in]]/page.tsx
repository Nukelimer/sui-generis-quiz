import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
    return <div className="flex justify-center items-center h-screen w-screen bg-slate-300">
      
      <SignIn />;
  </div>
}