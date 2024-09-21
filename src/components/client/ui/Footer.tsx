import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="wrapper">
          <div className="contact-info">
            <section className="location">
              <i className="ri-map-pin-2-line footer-icon"></i>
              <h3>Location</h3>
              <p>Sarail, D.C.Mills-1411, Bandar, Narayanganj</p>
            </section>
            <section className="Phone">
              <i className="ri-phone-fill footer-icon"></i>
              <h3>Phone</h3>
              <p>+8801627388996</p>
            </section>
            <section className="email">
              <i className="ri-mail-line footer-icon"></i>
              <h3>Email</h3>
              <Link href="mailto:foysalrana.official@gmail.com">
                foysaalrana.official@gmail.com
              </Link>
            </section>
          </div>
          <div className="social-icon">
            <h3>Social Links</h3>
            <ul className="flex-item">
              <li>
                <Link href="https://facebook.com/foysaalrana/" target="_blank">
                  <i className="ri-facebook-fill"></i>
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_foysal_rana_/"
                  target="_blank"
                >
                  <i className="ri-instagram-fill"></i>
                </a>
              </li>
              <li>
                <Link href="https://twitter.com/foysalranaa" target="_blank">
                  <i className="ri-twitter-fill"></i>
                </Link>
              </li>
              <li>
                <Link href="https://wa.link/1tpsv7" target="_blank">
                  <i className="ri-whatsapp-line"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="content">
            <p className="copyright">
              Copyright © {new Date().getFullYear().toString()} Foysal Rana. All
              Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
