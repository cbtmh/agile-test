import '../../assets/css/introSection.css';
import IntroImage from '../../assets/images/8.png'; 

const IntroSection = () => {
  return (
    <section className="intro-section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
      <div className="intro-container">
        

        <div className="intro-text">
          <h1>Save your data storage here.</h1>
          <p>
            Data Warehouse is a data storage area that has been tested for security, 
            so you can store your data here safely but not be afraid of being stolen by others.
          </p>
          <button className="learn-more-btn">
            Learn more
          </button>
        </div>

        <div className="intro-image">
          <img src={IntroImage} alt="Data storage illustration" />
        </div>

      </div>
    </section>
  );
};

export default IntroSection;