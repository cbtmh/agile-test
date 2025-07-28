
import '../../assets/css/Footer.css';
import FooterLogoIcon from '../../assets/images/3.png';


const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Footer = () => {
  return (
    <>
      <footer className="site-footer" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-column about-company">
              <a href="#" className="footer-logo">
                <img src={FooterLogoIcon} alt="DataWarehouse Logo" />
                <span>DataWarehouse</span>
              </a>
              <address className="footer-address">
                <div className="footer-address-weight">
                  Warehouse Society, 234<br />
                  Bahagia Ave Street  PRBW 29281<br />
                  <br />
                </div>
                info@warehouse.project<br />
                1-232-3434 (Main)
              </address>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">About</h3>
              <ul className="footer-links">
                <li><a href="#">Profile</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">DW News</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Help</h3>
              <ul className="footer-links">
                <li><a href="#">Support</a></li>
                <li><a href="#">Sign up</a></li>
                <li><a href="#">Guide</a></li>
                <li><a href="#">Reports</a></li>
                <li><a href="#">Q&A</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Social Media</h3>
              <div className="social-media-icons">
                <a href="#facebook" className="social-icon" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#instagram" className="social-icon" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#github" className="social-icon" aria-label="Github">
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className='footer-right'>
              <p className="footer-bottom-weight">&copy; Datawarehouse™. 2020. All rights reserved.</p>
              <p>Company Registration Number: 21479524.</p>
            </div>
            <button className="chat-fab" aria-label="Open Chat">
              <ChatIcon />
            </button>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Footer;