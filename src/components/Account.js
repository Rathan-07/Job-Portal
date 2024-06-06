
import CandidateProfile from "./CandidateProfile"
import { useAuth } from "./context/AuthContext"
import RecruiterProfile from "./RecruiterProfile"
export default function Account() {
    const { user } = useAuth()
    return (
        <div>
            <h2>Account Info</h2>
            { user && (
                <div> 
                    <p>Username - { user?.account?.username }</p>
                    <p>Email - { user?.account?.email }</p>
                    <p>Role - { user?.account?.role }</p>
                    {user?.account?.role === 'candidate' ?<CandidateProfile/> :<RecruiterProfile/>}
                    
                </div> 
               
               
            )}
            
            
        </div>
    )
}
