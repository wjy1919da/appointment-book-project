import { SimpleGrid } from "@chakra-ui/react";
import DoctorCard from "../doctor-card/doctor-card.component";

const RecommendationGrid = () => {
    const doctors = [
        {
          id: 1,
          nickname: "Dr. Smith",
          address: "123 Medicine St, Health City",
          name: "John Smith",
          mechName: "Health Hospital",
        },
        {
          id: 2,
          nickname: "Dr. Johnson",
          address: "456 Wellness Ave, Health City",
          name: "Sarah Johnson",
          mechName: "Wellness Clinic",
        },
        {
          id: 3,
          nickname: "Dr. Lee",
          address: "789 Health Blvd, Health City",
          name: "", // 这个医生没有名字
          mechName: "Life Care Center",
        }
        // {
        //   id: 4,
        //   nickname: "Dr. Patel",
        //   address: "101 Health Plaza, Health City",
        //   name: "Amit Patel",
        //   mechName: "Vitality Hospital",
        // },
      ];
      const doctorList = doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))
      
  return (
        <SimpleGrid columns={1} spacing={0}>
            {doctorList}
        </SimpleGrid>
  )
}

export default RecommendationGrid