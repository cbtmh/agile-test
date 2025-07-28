
interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  bgColor: string; 
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageSrc, bgColor }) => {
  return (
    <div className="feature-card">
      <div 
        className="card-bg-shape" 
        style={{ backgroundColor: bgColor }}
      ></div>
      
      <div className="card-content">
        <div className="feature-image-wrapper">
          <img src={imageSrc} alt={title} className="feature-image" />
        </div>
        <div className="feature-text-content">
          <h3 className="feature-title">{title}</h3>
          <p className="feature-description">{description}</p>
          <a href="#" className="learn-more-link">
            Learn more
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="#8645FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;