/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import Image from "next/image";

const AboutMe = () => {
  return (
    <section id="about-me">
      <div className="container">
        <div className="wrapper flex-item">
          <div className="about-img">
            <div className="img-style">
              <Image
                src="/client/images/foysal.jpg"
                alt="Foysal Rana"
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          </div>
          <div className="about-content">
            <div className="title">
              <h2>About Me</h2>
            </div>
            <div className="about-text">
              <p>
                I'm Foysal Rana, a Front-End Developer. I just recently
                graduated with Diploma in Engineering in Computer Technology.
                Currently, I'm seeking a job as a Front-End Developer. I don't
                have any industrial experience but during my learning session, I
                have personally worked with so many projects which I have shown
                on the <Link href="#projects">project section</Link>.
              </p>
              <h1>Foysal Rana</h1>
              <h3>Front-End Developer</h3>
              <div className="content-btn flex-item">
                <Link href="#/" className="btn cv">
                  Resume
                </Link>
                <Link href="#contact" className="btn">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
