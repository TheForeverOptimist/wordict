import React from "react";

interface HintBoxProps {
  hint: string;
}

const HintBox: React.FC<HintBoxProps> = ({ hint }) => {
  return (
    <div className="w-8 h-8 flex items-center justify-center text-xl mx-1">
      {hint}
    </div>
  );
};

export default HintBox;
