"use client";
import Image from "next/image";
import React from "react";

const ProjectDetails = () => {
  return (
    <div className="modal-overlay project-overlay">
      <div className="project-modal-content">
        <div className="project-modal-header">
          <h2>Project Title 2</h2>
        </div>
        <div className="wrapper">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/client/images/foysal.jpg"
            alt="Project Image"
          />
          <div className="project-modal-body">
            <div className="project-modal-info">
              <p>
                <strong>Project Info: </strong>
                Quidam lisque persius interesset his et, in quot quidam
                persequeris vim, ad mea essent possim iriure.
              </p>
              <p>
                Lisque persius interesset his et, in quot quidam persequeris
                vim, ad mea essent possim iriure.
              </p>
            </div>
            <div className="project-modal-details">
              <p>
                <strong>Client:</strong> Ruby Clinton
              </p>
              <p>
                <strong>Technologies:</strong> iOS, HTML5, CSS3, PHP, Java
              </p>
              <p>
                <strong>Industry:</strong> Art & Design
              </p>
              <p>
                <strong>Date:</strong> July 16, 2019
              </p>
              <p>
                <strong>Link:</strong>
                <a href="https://www.example.com" target="_blank">
                  www.example.com
                </a>
              </p>
            </div>
          </div>
          <span className="project-close-modal">
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
