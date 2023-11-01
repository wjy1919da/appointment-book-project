import Footer from '../../components/footer/footer.component';
import "./not-found.styles.scss";

const AccountNotFoundPage = () => {
    return (
        <div className="not-found-page-container">
            <div className="not-found-page-screen">
                <button class="back-home-button"></button>
                <span className='not-found-text'>404 Not Found</span>
                <span className='feature-coming-soon-text'>Feature is Coming Soon!</span>
            </div>
            <Footer/>
        </div>
    )
}

export default AccountNotFoundPage;