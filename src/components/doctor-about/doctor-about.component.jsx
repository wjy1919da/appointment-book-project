import './doctor-about.styles.scss';
import DoctorAboutSection from '../doctor-about-section/doctor-about-section.component';
import { useGetDoctorAbout } from '../../hooks/useGetIndividualDoctor';
import highlightYear from '../../assets/doctor/highlight-year.png';
import highlightVerified from '../../assets/doctor/highlight-verified.png';
import highlightAppointment from '../../assets/doctor/highlight-appointment.png';

const DoctorAbout = () => {
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetDoctorAbout();

    const abouts = [
        {'title': 'Coupons',
            'items': data?.pages[0].data.programs},
        {'title': 'Highlights',
            'items': []},
        {'title': 'Specializations',
            'items': data?.pages[0].data.interesteds},
        {'title': 'Consult',
            'items': data?.pages[0].data.methods}
    ]

    if (data?.pages[0].data.actual !== null) {
        abouts[1].items.push(
            {'content': highlightYear,
             'title': data?.pages[0].data.actual + ' years in business'}
        )
    }
    if (data?.pages[0].data.isAuth !== null) {
        abouts[1].items.push(
            {'content': highlightVerified,
             'title': data?.pages[0].data.isAuth !== null ? 'Licence verified by Charm' : ''}
        )
    }
    if (data?.pages[0].data.method !== null) {
        abouts[1].items.push(
            {'content': highlightAppointment,
             'title': data?.pages[0].data.method !== null ? 'To make an appointment' : ''}
        )
    }

    return (
        <div className='doctor-about-container'>
            <DoctorAboutSection title={abouts[0].title} items={abouts[0].items}></DoctorAboutSection>
            <DoctorAboutSection title={abouts[1].title} items={abouts[1].items}></DoctorAboutSection>
            <DoctorAboutSection title={abouts[2].title} items={abouts[2].items}></DoctorAboutSection>
            <DoctorAboutSection title={abouts[3].title} items={abouts[3].items}></DoctorAboutSection>
        </div>
    )
}

export default DoctorAbout;