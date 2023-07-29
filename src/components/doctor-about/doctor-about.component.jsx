import './doctor-about.styles.scss';
import DoctorAboutSection from '../doctor-about-section/doctor-about-section.component';
import { useGetDoctorAbout } from '../../hooks/useGetIndividualDoctor';
import highlightYear from '../../assets/doctor/highlight-year.png';
import highlightVerified from '../../assets/doctor/highlight-verified.png';
import highlightAppointment from '../../assets/doctor/highlight-appointment.png';

const DoctorAbout = () => {
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetDoctorAbout();

    if (isLoading) {
        return <div>Loading...</div>;
    }
      
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // 在数据加载完成且无错误时，判断数据是否存在，不存在则渲染一个空的组件或消息
    if (!data || !data.pages[0]?.data) {
        return <div>No data available</div>;
    }

    // 如果数据存在，我们可以安全地进行解构
    const { programs, interesteds, methods, actual, isAuth, method } = data.pages[0].data;

    const abouts = [
        {'title': 'Coupons', 'items': programs},
        {'title': 'Highlights', 'items': []},
        {'title': 'Specializations', 'items': interesteds},
        {'title': 'Consult', 'items': methods}
    ]

    if (actual !== null) {
        abouts[1].items.push(
            {'content': highlightYear,
             'title': actual + ' years in business'}
        )
    }
    if (isAuth !== null) {
        abouts[1].items.push(
            {'content': highlightVerified,
             'title': isAuth !== null ? 'Licence verified by Charm' : ''}
        )
    }
    if (method !== null) {
        abouts[1].items.push(
            {'content': highlightAppointment,
             'title': method !== null ? 'To make an appointment' : ''}
        )
    }

    return (
        <div className='doctor-about-container'>
            {abouts[0]?.items && <DoctorAboutSection title={abouts[0].title} items={abouts[0].items}></DoctorAboutSection>}
            {abouts[1]?.items && <DoctorAboutSection title={abouts[1].title} items={abouts[1].items}></DoctorAboutSection>}
            {abouts[2]?.items && <DoctorAboutSection title={abouts[2].title} items={abouts[2].items}></DoctorAboutSection>}
            {abouts[3]?.items && <DoctorAboutSection title={abouts[3].title} items={abouts[3].items}></DoctorAboutSection>}
        </div>
    )
}

export default DoctorAbout;
