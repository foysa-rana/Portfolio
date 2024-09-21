"use client";
// import Link from "next/link";
import Image from "next/image";

const Projects = () => {
  return (
    <section id="projects">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h2>Projects</h2>
          </div>
          <div className="grid-container">
            <div className="grid-item">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/client/images/projects/foysal_rana_portfolio.jpg"
                alt="Hand holding phone"
              />
              <div className="overlay">
                <h2>Project Title</h2>
                <div className="project-data">
                  <a href="">Preview</a>
                  <a>Details</a>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/client/images/projects/foysal_rana_portfolio.jpg"
                alt="Hand holding phone"
              />
              <div className="overlay">
                <h2>Project Title</h2>
                <div className="project-data">
                  <a href="">Preview</a>
                  <a>Details</a>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/client/images/projects/foysal_rana_portfolio.jpg"
                alt="Hand holding phone"
              />
              <div className="overlay">
                <h2>Project Title</h2>
                <div className="project-data">
                  <a href="">Preview</a>
                  <a>Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
