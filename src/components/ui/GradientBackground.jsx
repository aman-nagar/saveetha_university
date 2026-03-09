import React from 'react';

/**
 * GradientBackground Component
 * Generates unique, professional gradient patterns based on a seed value
 * Perfect for creating distinctive profile backgrounds for each student
 */
export const GradientBackground = ({
  seed = '',
  size = 'medium',
  className = '',
}) => {
  // Generate deterministic gradient stops based on seed
  const generateGradient = (seedString) => {
    const hash = seedString.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);

    const gradients = [
      'from-blue-500 via-purple-500 to-pink-500',
      'from-emerald-500 via-teal-500 to-blue-500',
      'from-orange-500 via-red-500 to-pink-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-cyan-500 via-blue-500 to-indigo-500',
      'from-green-500 via-emerald-500 to-teal-500',
      'from-amber-500 via-orange-500 to-red-500',
      'from-violet-500 via-purple-500 to-pink-500',
      'from-sky-500 via-blue-500 to-cyan-500',
      'from-rose-500 via-pink-500 to-purple-500',
    ];

    return gradients[Math.abs(hash) % gradients.length];
  };

  const gradient = generateGradient(seed);
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32',
    large: 'w-48 h-48',
    full: 'w-full h-full',
  };

  return (
    <div
      className={`bg-gradient-to-br ${gradient} ${sizeClasses[size]} ${className}`}
    />
  );
};

export default GradientBackground;
