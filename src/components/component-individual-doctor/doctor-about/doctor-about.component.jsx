import './doctor-about.styles.scss';
import { useState } from 'react';
import DoctorAboutSection from '../../doctor-about-section/doctor-about-section.component';
import DocotorOwnVoucherCard from '../../doctor-own-profile/doctor-profile-voucher-card';
import DoctorReviewGrid from '../../../components/component-individual-doctor/doctor-review-grid/doctor-review-grid.component';
import { useGetDoctorAbout } from '../../../hooks/useGetIndividualDoctor';
import highlightYear from '../../../assets/doctor/highlight-year.png';
import highlightVerified from '../../../assets/doctor/highlight-verified.png';
import highlightAppointment from '../../../assets/doctor/highlight-appointment.png';

const DoctorAbout = () => {
    const [voucherExpanded, setVoucherExpanded] = useState(false);
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetDoctorAbout();
    const { programs, interesteds, methods, actual, isAuth, method } = data.pages[0].data;
    const [vouchers, setVouchers] = useState(programs);
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
    const toggleVoucherExpanded = () => {
        setVoucherExpanded(!voucherExpanded);
    }

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
    let specializations = interesteds;
    // setVouchers(programs);

    const printTest = () => {
        console.log('Testing prints...');
    }
    const voucherClick = (item) => {
        console.log('item is: ', item);
        const holder = vouchers.filter((voucher) => voucher === item);
        setVouchers(holder);
    }

    if (voucherExpanded) {
        return (
            <div className='indv-doctor-about-container' >
                <div className='indv-vouchers-big-container' >
                    <div className='vouchers-container' >
                    {vouchers.length > 0 ? vouchers.map((item, index) => {
                        return <DocotorOwnVoucherCard key={index} />
                    }) : <h3 className='indv-no-vouchers-title' >No vouchers currently available, check back later for more great deals!</h3>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='indv-doctor-about-container' >
            <div className='indv-vouchers-big-container' >
                <div className='vouchers-title-container' >
                    <h3 className='indv-vouchers-title' >Vouchers</h3>
                </div>
                <div className='vouchers-container' >
                    {vouchers.length > 0 ? vouchers.map((item, index) => {
                        return <DocotorOwnVoucherCard key={index} onClick={() => voucherClick(item)}/>
                    }) : <h3 className='indv-no-vouchers-title' >No vouchers currently available, check back later for more great deals!</h3>}
                    {/* <DocotorOwnVoucherCard onClick={printTest}/>
                    <DocotorOwnVoucherCard /> */}
                </div>
            </div>
            <div className='indv-specialization-big-container' >
                <div className='specialization-title-container' >
                    <h3 className='indv-specialization-title' >Specialization</h3>
                </div>
                <div className='specialization-tabs-container' >
                    {specializations.map((item, index) => {
                        return <SpecializationIcon specialization={item} key={index} />
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

const SpecializationIcon = ({specialization}) => {
    const imgUrl = specialization.content;
    const title = specialization.title;
    return (
        <div className='indv-procedure-icon-container' >
            <div className='indv-procedure-icon-img-container' >
                <img className='indv-procedure-icon-img' src={imgUrl} alt='procedure' />
            </div>
            <div className='indv-procedure-icon-title-container' >
                <h3 className='indv-procedure-icon-title' >{title}</h3>
            </div>
        </div>
    )
}

export default DoctorAbout;