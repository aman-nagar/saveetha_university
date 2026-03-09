/**
 * Skeleton Loader Component
 * Flexible, reusable skeleton component for loading states
 */

const Skeleton = ({
  className = "",
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
  variant = "default", // 'default', 'circle', 'text', 'card'
}) => {
  const baseClass =
    "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse";

  const variants = {
    default: `${width} ${height} ${rounded}`,
    circle: "w-12 h-12 rounded-full",
    text: "w-full h-4 rounded",
    card: "w-full h-48 rounded-lg",
  };

  return (
    <div
      className={`${baseClass} ${variants[variant] || variants.default} ${className}`}
    />
  );
};

export default Skeleton;
