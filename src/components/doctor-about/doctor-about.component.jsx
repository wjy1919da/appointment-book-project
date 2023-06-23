import './doctor-about.styles.scss';
import DoctorAboutSection from '../doctor-about-section/doctor-about-section.component';

const DoctorAbout = () => {
    const abouts = [
        {'title': 'Coupons',
            'items': [
                {'pic': '',
                'name': 'coupon1'},
                {'pic': '',
                'name': 'coupon2'}
        ]},
        {'title': 'Highlights',
            'items': [
                {'pic': '',
                'name': 'highlight1'},
                {'pic': '',
                'name': 'highlight2'},
                {'pic': '',
                'name': 'highlight3'},
                {'pic': '',
                'name': 'highlight4'}
        ]},
        {'title': 'Specializations',
            'items': [
                {'pic': '',
                'name': 's1'},
                {'pic': '',
                'name': 's2'},
                {'pic': '',
                'name': 's3'},
        ]},
        {'title': 'Consult',
            'items': [
                {'pic': '',
                'name': 'c1'},
                {'pic': '',
                'name': 'c2'}
        ]},
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