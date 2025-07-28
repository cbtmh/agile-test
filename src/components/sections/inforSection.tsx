
import '../../assets/css/inforSection.css';
import InforImage from '../../assets/images/1.png';

const InforSection = () => {
  return (
    
    <section className="infor-container" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="400"> 
      <div className="infor-section"> 
        <div className="infor-image-wrapper">
          <img src={InforImage} alt="Data Warehouse Illustration" />
        </div>
        <div className="infor-content">
          <h1 className="infor-title">
            We are a high-level data storage bank
          </h1>
          <p className="infor-description">
            The place to store various data that you can access at any time
            through the internet and where you can carry it. This very flexible
            storage area has a high level of security. To enter into your own
            data you must enter the password that you created when you
            registered in this Data Warehouse.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InforSection;