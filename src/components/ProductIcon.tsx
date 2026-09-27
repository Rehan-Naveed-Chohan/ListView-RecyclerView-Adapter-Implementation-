import React from 'react';
import {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Camera,
  Speaker,
  Tablet,
  Gamepad2,
  Keyboard,
  Monitor,
  Package
} from 'lucide-react';

interface ProductIconProps {
  iconKey: string;
  className?: string;
  size?: number;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ iconKey, className = "text-indigo-600", size = 28 }) => {
  switch (iconKey) {
    case 'smartphone':
      return <Smartphone size={size} className={className} />;
    case 'headphones':
      return <Headphones size={size} className={className} />;
    case 'laptop':
      return <Laptop size={size} className={className} />;
    case 'watch':
      return <Watch size={size} className={className} />;
    case 'camera':
      return <Camera size={size} className={className} />;
    case 'speaker':
      return <Speaker size={size} className={className} />;
    case 'tablet':
      return <Tablet size={size} className={className} />;
    case 'gaming':
      return <Gamepad2 size={size} className={className} />;
    case 'keyboard':
      return <Keyboard size={size} className={className} />;
    case 'monitor':
      return <Monitor size={size} className={className} />;
    default:
      return <Package size={size} className={className} />;
  }
};
