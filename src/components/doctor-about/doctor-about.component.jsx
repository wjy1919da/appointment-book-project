import './doctor-about.styles.scss';
import DoctorAboutSection from '../doctor-about-section/doctor-about-section.component';
import { useGetDoctorAbout } from '../../hooks/useGetIndividualDoctor';

const DoctorAbout = () => {
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetDoctorAbout();

    const abouts = [
        {'title': 'Coupons',
            'items': data?.pages[0].data.programs},
        {'title': 'Highlights',
            'items': [
                {'content': '',
                'title': data?.pages[0].data.isAuth},
                {'content': '',
                'title': data?.pages[0].data.actual},
                {'content': '',
                'title': data?.pages[0].data.method}
        ]},
        {'title': 'Specializations',
            'items': data?.pages[0].data.interesteds},
        {'title': 'Consult',
            'items': data?.pages[0].data.methods}
    ]

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