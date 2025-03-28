export function EmptyState({ title = "No data available", description = "There's nothing here yet.", icon = "file", className = "" }) {
  // Define different icons based on the icon prop
  const icons = {
    file: <></>,
    search: <></>,
  };

  const IconComponent = icons[icon] || <></>;

  // Animation variants for the icon
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [-10, 10], // Hanya dua keyframe
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        yoyo: Infinity, // Looping efek bolak-balik
      },
    },
  };

  // Animation variants for the circles
  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: [0, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.2,
        repeatType: "reverse",
      },
    }),
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center px-4 ${className}`}>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mb-6">{description}</p>
    </div>
  );
}
