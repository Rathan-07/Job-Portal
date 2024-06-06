import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ListJobs(){
    const[job,setJob] = useState([])
    useEffect(()=>{
        async function fetchingJob(){
           try{
            const response = await axios.get(`http://localhost:3068/api/jobs`)
            setJob(response.data)
           }
           catch(error){
            console.log(error)
           }
        
        }
        fetchingJob()
    },[])
    return (
        <div>
            <h2>List Job</h2>
            <ul>
                {job.map((ele)=>{
                    return (
                        <li key={ele._id}><Link to={`/job-detail/${ele._id}`}>{ele.title}</Link></li>
                    )
                })}
            </ul>

        </div>
    )
}