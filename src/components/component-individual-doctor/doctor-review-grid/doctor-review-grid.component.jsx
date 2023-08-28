import './doctor-review-grid.styles.scss';
import { useGetDoctorReviews } from '../../../hooks/useGetIndividualDoctor';
import useDoctorQueryStore from '../../../store.ts';
const DoctorReviewGrid = () => {
    const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
    console.log('IndividualDoctor queryStore: ', doctorQuery);
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useGetDoctorReviews();
    return (
        <div>DoctorReviewGrid</div>
    )
}

export default DoctorReviewGrid;