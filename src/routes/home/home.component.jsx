import HomeDoctors from '../../components/components-home/home-doctors/home-doctors.component';
import HomeInstruments from '../../components/components-home/home-instruments/home-instruments.component';
import Footer from '../../components/footer/footer.component';
import './home.styles.scss';
import HomeRecommande from '../../components/components-home/home-recommende/home-recommende';
import HomePost from '../../components/components-home/home-post/home-post.component';
import HomeDoctorPage from '../../components/components-home/home-doctor-page/home-doctor-page.component';
import HomeIndex from '../../components/components-home/home-index/home-index.component';
const Home = () => {
    return (
        <div className='home-component-container'>
            <HomeIndex />
            <HomeDoctorPage/>
            <HomePost/>
            <HomeRecommande/>
            <HomeInstruments />
            <HomeDoctors />
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;