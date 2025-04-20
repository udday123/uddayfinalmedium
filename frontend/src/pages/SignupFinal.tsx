import { Quote } from "./Quote"
import { Signup } from "./Signup"
// import axios from "axios"



export function Signupfinal(){
    return(

        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Signup/>
            </div>
            <div className="invisible md:visible">
                <Quote/>
            </div>
        </div>
    )
}