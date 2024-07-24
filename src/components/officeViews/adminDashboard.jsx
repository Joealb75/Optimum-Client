import { useState, useEffect } from "react"
import { getAllConsultations } from "../../data-services/consultation_data.js"


export const AdminDashboard = () => {
    const [allConsultations, setAllConsultations ] = useState()

    useEffect(() => {
        getAllConsultations().then(consultationData => {
            if(consultationData) {
                setAllConsultations(consultationData)
            }
        })
    }, [])
    console.log(allConsultations)
    
    return(
        <>
            <h1>Hello</h1>
        </>
    )
}