const HomeSpinner = () => {
    return (
      <div className="spinner-container">
        <div className="d-flex justify-content-center">
          <div className="spinner-grow" role="status">
          </div>
        </div>
        <div className="spinner-text">
          Loading...
        </div>
      </div>
    );
}
export default HomeSpinner;