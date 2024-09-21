"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const menuActive = () => {
    setIsMenuActive(true);
  };
  const menuClose = () => {
    setIsMenuActive(false);
  };
  return (
    <>
      <div className="overlay"></div>
      <div
        className={`menu-icon ${isMenuActive ? "hide-menu-icon" : ""}`}
        onClick={menuActive}
      >
        <i className="ri-menu-line"></i>
      </div>
      <div
        className={`close-icon ${!isMenuActive ? "hide-menu-icon" : ""}`}
        onClick={menuClose}
      >
        <i className="ri-close-line"></i>
      </div>
      {/* <!-- Side Bar --> */}
      <aside className={`sidebar ${isMenuActive ? "show-sidebar" : ""}`}>
        <div className="wrapper">
          {/* <!-- Nav Bar --> */}
          <nav className="navbar">
            <div className="navbar-profile">
              <Link href="#foysal_rana">
                <Image
                  alt="Foysal Rana"
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/client/images/foysal.jpg"
                />
                <h2>Foysal Rana</h2>
              </Link>
            </div>
            {/* <!-- Nav Links --> */}
            <ul className="nav-links">
              <li className="nav-item about-me">
                <Link href="#about-me" className="nav-link">
                  <i className="nav-icon ri-article-line"></i>{" "}
                  <span>About</span>
                </Link>
              </li>
              <li className="nav-item education">
                <Link href="#education" className="nav-link">
                  <i className="nav-icon ri-graduation-cap-line"></i>
                  <span>Education</span>
                </Link>
              </li>
              <li className="nav-item skills">
                <Link href="#skills" className="nav-link">
                  <i className="nav-icon ri-code-box-line"></i>{" "}
                  <span>Skill</span>
                </Link>
              </li>
              <li className="nav-item projects">
                <Link href="#projects" className="nav-link">
                  <i className="nav-icon ri-list-check-3"></i>
                  <span>Projects</span>
                </Link>
              </li>
              <li className="nav-item contact">
                <Link href="#contact" className="nav-link">
                  <i className="nav-icon ri-contacts-line"></i>
                  <span>Contact&nbsp;Me</span>
                </Link>
              </li>
            </ul>
            {/* <!-- End of Nav Links --> */}
            {/* <!-- Follow Us --> */}
            <div className="follow">
              <div className="title">
                <h3>Follow Us</h3>
              </div>
              <div className="social-icon">
                <ul>
                  <li>
                    <Link
                      href="https://facebook.com/foysaalrana/"
                      target="_blank"
                    >
                      <i className="nav-icon ri-facebook-line"></i>
                      <span>Facebook</span>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/_foysal_rana_/"
                      target="_blank"
                    >
                      <i className="nav-icon ri-instagram-line"></i>
                      <span>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <Link
                      href="https://twitter.com/foysalranaa"
                      target="_blank"
                    >
                      <i className="nav-icon ri-twitter-line"></i>
                      <span>Twitter</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://twitter.com/foysalranaa"
                      target="_blank"
                    >
                      <i className="nav-icon ri-whatsapp-line"></i>
                      <span>Whatsapp</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- End of follow us --> */}
          </nav>
          {/* <!-- end of nav bar --> */}
        </div>
      </aside>
      {/* <!-- end of side bar --> */}
    </>
  );
};

export default Sidebar;
