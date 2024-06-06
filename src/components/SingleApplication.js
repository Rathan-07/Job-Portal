import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function SingleApplications(){
    const statusTypes = [
        { name: 'submitted', value: 'submitted' },
        { name: 'Under-review', value: 'Under-review' },
        { name: 'Rejected', value: 'Rejected' },
        { name: 'Accepted', value: 'Accepted' },
    ];
    const {id,appId} = useParams()
    const [singleApp,setSingleApp] = useState(null)
    const[status,setStatus] = useState('')
    const[update,setUpdate] = useState(null)

    useEffect(()=>{
        async function fetchingSingleApp(){
            try{
                const response = await axios.get(`http://localhost:3068/api/jobs/${id}/applications/${appId}`,{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                setSingleApp(response.data)
            }
            catch(error){
                console.log(error);
            }
        }
        fetchingSingleApp()
    },[id,appId])
    const hanndleChange = (e)=>{

        const{value} = e.target
        console.log(value);
       setStatus(value)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
         try{
            const response = await axios.put(`http://localhost:3068/api/jobs/${id}/applications/${appId}`,{
                status:status
            },{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            setUpdate(response.data.status)
         }
         catch(error){
            console.log(error);
         }

    }

    return (
        <div>
            <h2>Single Application</h2>
            <h2>Job Info</h2>
            <h5>JobId: {singleApp?.job?._id}</h5>
            <h5>JobTitle: {singleApp?.job?.title}</h5>
            <h5>Status : {update ? update :singleApp?.status}</h5>
            <h2>Candidate Info</h2>
            <h2>Candidate name:{singleApp.candidate?.name}</h2>
            <form onSubmit={handleSubmit}>
                <select value={status} onChange={hanndleChange}>
                    <option value="">Select Status</option>
                    {statusTypes.map((ele,i)=>{
                        return (
                            <option key={i}value={ele.value} >{ele.name}</option>
                        )
                    })}
                    
                </select><br />
                <button type="submit">Update</button>

            </form>

        </div>
    )
}