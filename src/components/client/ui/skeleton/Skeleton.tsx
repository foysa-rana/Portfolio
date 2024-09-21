import "@/css/skeleton/skeleton.css";

const Skeleton = () => {
  return (
    <div className="skeleton-container">
      {/* <!-- Profile Skeleton --> */}
      <div className="profile-skeleton">
        <div className="skeleton profile-image-skeleton"></div>
        <div className="profile-info-skeleton">
          <div className="skeleton name"></div>
          <div className="skeleton role"></div>
          <div className="buttons">
            <div className="skeleton button"></div>
            <div className="skeleton button"></div>
          </div>
        </div>
      </div>

      {/* <!-- About Skeleton --> */}
      <div className="about-skeleton">
        <div className="skeleton title"></div>
        <div className="skeleton text" style={{ width: "80%" }}></div>
        <div className="skeleton text" style={{ width: "60%" }}></div>
        <div className="skeleton text" style={{ width: "90%" }}></div>
      </div>

      {/* <!-- Skills Skeleton --> */}
      <div className="skills-skeleton">
        <div className="skeleton skill-item"></div>
        <div className="skeleton skill-item"></div>
        <div className="skeleton skill-item"></div>
        <div className="skeleton skill-item"></div>
        <div className="skeleton skill-item"></div>
      </div>

      {/* <!-- Education Skeleton --> */}
      <div className="education-skeleton">
        <div className="skeleton edu-item" style={{ width: "70%" }}></div>
        <div className="skeleton edu-item" style={{ width: "50%" }}></div>
      </div>

      {/* <!-- Projects Skeleton --> */}
      <div className="projects-skeleton">
        <div className="skeleton project-card"></div>
        <div className="skeleton project-card"></div>
        <div className="skeleton project-card"></div>
      </div>

      {/* <!-- Contact Skeleton --> */}
      <div className="contact-skeleton">
        <div className="skeleton input"></div>
        <div className="skeleton input"></div>
        <div className="skeleton input"></div>
      </div>
    </div>
  );
};

export default Skeleton;
