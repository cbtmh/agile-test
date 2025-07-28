
import FeatureCard from '../ui/featureCard'; 
import '../../assets/css/featureSection.css'; 
import img1 from '../../assets/images/4.png';
import img2 from '../../assets/images/5.png';
import img3 from '../../assets/images/6.png';
import img4 from '../../assets/images/7.png';


const featuresData = [
  {
    title: 'Search Data',
    description: "Don't worry if your data is very large, the Data Warehoue provides a search engine, which is useful for making it easier to find data effectively saving time.",
    imageSrc: img1, 
    bgColor: 'rgba(232, 237, 255, 0.6)', 
  },
  {
    title: '24 Hours Access',
    description: 'Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.',
    imageSrc: img2,
    bgColor: 'rgba(240, 233, 255, 0.6)', 
  },
  {
    title: 'Print Out',
    description: 'Print out service gives you convenience if someday you need print data, just edit it all and just print it.',
    imageSrc: img3,
    bgColor: 'rgba(255, 232, 245, 0.6)', 
  },
  {
    title: 'Security Code',
    description: 'Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that you created.',
    imageSrc: img4,
    bgColor: 'rgba(232, 250, 255, 0.6)', 
  },
];

const featureSection = () => {
  return (
    <section className="features-section">
      <div data-aos="fade-up"> 
        <h2 className="section-title">Features</h2>
        <p className="section-subtitle">
          Some of the features and advantages that we provide for those of you 
          who store data in this Data Warehouse.
        </p>
      </div>
      <div className="features-grid">
        {featuresData.map((feature, index) => (

          <div 
            key={index} 
            data-aos="fade-up" 
            data-aos-delay={index * 150} 
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              bgColor={feature.bgColor}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default featureSection;