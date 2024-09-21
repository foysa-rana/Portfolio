import "@/css/skeleton/sidebarSkeleton.css";
const SidebarSkeleton = () => {
  return (
    <div className="skeleton-sidebar">
      {/* <!-- Profile Image Skeleton --> */}
      <div className="skeleton-profile"></div>

      {/* <!-- Name Skeleton --> */}
      <div className="skeleton-name"></div>

      {/* <!-- Icons Skeleton --> */}
      <div className="skeleton-icon"></div>
      <div className="skeleton-divider"></div>
      <div className="skeleton-icon"></div>
      <div className="skeleton-divider"></div>
      <div className="skeleton-icon"></div>
      <div className="skeleton-divider"></div>
      <div className="skeleton-icon"></div>

      {/* <!-- Follow Us Text Skeleton --> */}
      <div className="skeleton-follow-us"></div>

      {/* <!-- Social Media Icons Skeleton --> */}
      <div className="skeleton-social"></div>
      <div className="skeleton-social"></div>
      <div className="skeleton-social"></div>
      <div className="skeleton-social"></div>
    </div>
  );
};

export default SidebarSkeleton;
