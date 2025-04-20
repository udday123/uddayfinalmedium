import { Signin } from "./Signin"

export function Quote() {
    return (
      <div className="flex items-center justify-center bg-black text-white h-screen">
        <div className="text-center font-bold text-4xl max-w-2xl px-4 shadow-lg">
          *Success is not final, failure is not fatal: it is the courage to continue that counts.*
          <br />
          <span className="text-lg font-normal">- Winston Churchill</span>
        </div>
      </div>
    );
  }
  
export function Signinfinal(){
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Signin/>
            </div>
            <div>
                <Quote/>
            </div>
        </div>
    )
}