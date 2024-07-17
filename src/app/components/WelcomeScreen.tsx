import React, { useEffect, useState } from "react";
import { Star } from "./svgs";

interface WelcomeScreenProps {
  onDone: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDone }) => {
  const [visible, setVisbible] = useState<boolean>(true);

  useEffect(() => {
    //set timer to hide welcome screen after 2 seconds

    const timer = setTimeout(() => {
      setVisbible(false);
      onDone();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-transparent w-full h-full flex justify-center items-center backdrop-blur-md z-50">
      <Star className="animate-spin-slow w-40 h-40 " />
    </div>
  );
};

export default WelcomeScreen;
