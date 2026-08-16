import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const ConfettiEffect = ({ active }) => {
  const { width, height } = useWindowSize();

  if (!active) return null;

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={250}
      recycle={false}
      colors={["#FFD700", "#D32F2F", "#38BDF8", "#FFFFFF", "#10B981"]}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 2000, pointerEvents: "none" }}
    />
  );
};

export default ConfettiEffect;
