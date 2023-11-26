import './doctor-about.styles.scss';
import DoctorAboutSection from '../../doctor-about-section/doctor-about-section.component';
import DocotorOwnVoucherCard from '../../doctor-own-profile/doctor-profile-voucher-card';
import DoctorReviewGrid from '../../../components/component-individual-doctor/doctor-review-grid/doctor-review-grid.component';
import { useGetDoctorAbout } from '../../../hooks/useGetIndividualDoctor';
import highlightYear from '../../../assets/doctor/highlight-year.png';
import highlightVerified from '../../../assets/doctor/highlight-verified.png';
import highlightAppointment from '../../../assets/doctor/highlight-appointment.png';

const DoctorAbout = () => {
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetDoctorAbout();
    console.log('doctor about data is: ', data);

    if (isLoading) {
        return <div>Loading...</div>;
    }
      
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data || !data.pages[0]?.data) {
        return <div>No data available</div>;
    }

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
    const specializations = ['breast_augmentation', 'facelift', 'fox_eyes', 'teeth_whitening'];

    return (
        <div className='indv-doctor-about-container' >
            <div className='indv-vouchers-big-container' >
                <div className='vouchers-title-container' >
                    <h3 className='indv-vouchers-title' >Vouchers</h3>
                </div>
                <div className='vouchers-container' >
                    <DocotorOwnVoucherCard />
                    <DocotorOwnVoucherCard />
                </div>
            </div>
            <div className='indv-specialization-big-container' >
                <div className='specialization-title-container' >
                    <h3 className='indv-specialization-title' >Specialization</h3>
                </div>
                <div className='specialization-tabs-container' >
                    {specializations.map((item, index) => {
                        return <SpecializationIcon procedureName={item} key={index} />
                    })}
                </div>
            </div>
            <div className='indv-highlight-cases-container' >
                <div className='highlight-cases-title-container' >
                    <h3 className='highlight-cases-title' >Highlight Cases</h3>
                </div>
                <div className='highlight-cases-cases-container' >
                    <div className='indv-highlight-case-container' >
                        <div className='indv-highlight-thumbnail-container' >

                        </div>
                        <div className='indv-highlight-description-container' >
                            <p className='indv-highlight-description' >Description 1 lorum ipsum Description 1 lorum ipsumDescription 1 lorum ipsumDescription 1 lorum ipsum</p>
                        </div>
                    </div>
                    <div className='indv-highlight-case-container' >
                        <div className='indv-highlight-thumbnail-container' >

                        </div>
                        <div className='indv-highlight-description-container' >
                            <p className='indv-highlight-description' >Description 1 lorum ipsum Description 1 lorum ipsumDescription 1 lorum ipsumDescription 1 lorum ipsum</p>
                        </div>
                    </div>
                    <div className='indv-highlight-case-container' >
                        <div className='indv-highlight-thumbnail-container' >

                        </div>
                        <div className='indv-highlight-description-container' >
                            <p className='indv-highlight-description' >Description 1 lorum ipsum Description 1 lorum ipsumDescription 1 lorum ipsumDescription 1 lorum ipsum</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='indv-customer-review-container' >
                <div className='customer-review-section-title-container' >
                    <h3 className='customer-review-section-title' >Customer Review</h3>
                </div>
                <div className='customer-review-review-container' >
                    <DoctorReviewGrid />
                </div>
            </div>
        </div>
        // <div className='doctor-about-container'>
        //     {abouts[0]?.items && <DoctorAboutSection title={abouts[0].title} items={abouts[0].items}></DoctorAboutSection>}
        //     {abouts[1]?.items && <DoctorAboutSection title={abouts[1].title} items={abouts[1].items}></DoctorAboutSection>}
        //     {abouts[2]?.items && <DoctorAboutSection title={abouts[2].title} items={abouts[2].items}></DoctorAboutSection>}
        //     {abouts[3]?.items && <DoctorAboutSection title={abouts[3].title} items={abouts[3].items}></DoctorAboutSection>}
        // </div>
    )
}

const SpecializationIcon = (procedureName) => {
    console.log('Attempting to create icon for: ', procedureName.procedureName);
    const convertName = (procedureTitle) => {
        let splitTitle = procedureTitle.split("_");
        splitTitle = splitTitle.map((item) => item.charAt(0).toUpperCase() + item.slice(1));
        console.log('split title array is: ', splitTitle);
        return splitTitle.join(' ');
    }
    return (
        <div className='indv-procedure-icon-container' >
            <div className='indv-procedure-icon-img-container' >
                <img className='indv-procedure-icon-img' src={require(`../../../assets/procedure/${procedureName.procedureName}.svg`)} alt='procedure' />
            </div>
            <div className='indv-procedure-icon-title-container' >
                <h3 className='indv-procedure-icon-title' >{convertName(procedureName.procedureName)}</h3>
            </div>
        </div>
    )
}

export default DoctorAbout;