import { SimpleGrid } from "@chakra-ui/react";
import DoctorCard from "../doctor-card/doctor-card.component";
import './recommendation-grid.styles.scss'
import RecommendationCard from "../doctor-card/recommendation-card.component";
const RecommendationGrid = ({ isMobile}) => {
    const doctors = [
        {
          id: 1,
          nickname: "Dr. Smith",
          address: "123 Medicine St",
          name: "John Smith",
          mechName: "Health Hospital",
        },
        {
          id: 2,
          nickname: "Dr. Johnson",
          address: "456 Wellness Ave",
          name: "Sarah Johnson",
          mechName: "Wellness Clinic",
        },
        {
          id: 3,
          nickname: "Dr. Johnson",
          address: "456 Wellness Ave",
          name: "Sarah Johnson",
          mechName: "Wellness Clinic",
        }
      ];
      const doctorList = doctors.map(doctor => (
        <RecommendationCard key={doctor.id} doctor={doctor}/>
      ))
      
  return (
        // isMobile ? 
        // <div className="recommendation-grid-outer-container">
        //     <div className='recommendation-title'>Specialization</div>
        //     <div className="recommendation-grid-container">
        //         {doctorList}
        //     </div>
        // </div>
        // :
        <div className="recommendation-grid-outer-container">
            <div className='recommendation-title'>Suggested</div>
            <SimpleGrid 
              columns={1} 
              spacing={0} 
              height="250px"
              //width="250px"
              overflowY="auto"
            >
                {doctorList}
            </SimpleGrid>
        </div>
  )
}

export default RecommendationGrid