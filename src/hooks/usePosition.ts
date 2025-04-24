
import { useState } from 'react';

interface Position {
  left: number;
  width: number;
  opacity: number;
}

export const usePosition = (initialPosition: Position = { left: 0, width: 0, opacity: 0 }) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  
  return {
    position,
    setPosition,
  };
};
