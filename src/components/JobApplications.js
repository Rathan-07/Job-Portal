import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function JobApplications(){
    const {id} = useParams()
    const[jobApp,setJobApp] = useState([])
    useEffect(()=>{
        async function fetchingJobApp(){
              const response = await axios.get(`http://localhost:3068/api/jobs/${id}/applications`,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
              })
              console.log(response.data)

              setJobApp(response.data)
        }
        fetchingJobApp()
    },[id])
    return (
        <div>
            <h2>Job Application</h2>
             
             <ul>
                {jobApp.map((ele)=>{
                    return (
                        <div>
                            <li> <strong>id</strong> - <Link to ={`/single-application/${ele.job}/applications/${ele._id}`}>{ele._id}</Link> </li>
                            <li> <strong>status</strong> - {ele.status}</li>
                        </div>
                       
                    )
                })}
             </ul>

        </div>
    )
}