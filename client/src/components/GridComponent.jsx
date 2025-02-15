import React from "react";

const GridComponent = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/60 to-black"></div>

      <div className="relative w-[130rem] h-[90rem] grid grid-cols-4 grid-rows-4">
        {[...Array(7)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40"
            style={{ top: `${rowIndex * (100 / 6)}%` }}
          />
        ))}
        {[...Array(7)].map((_, colIndex) => (
          <div
            key={colIndex}
            className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20"
            style={{ left: `${colIndex * (100 / 6)}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
