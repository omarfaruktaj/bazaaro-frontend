import React from "react";

type PropType = {
  selected: boolean;
  slide: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, slide, onClick } = props;

  return (
    <div
      key={slide}
      onClick={onClick}
      className={`relative cursor-pointer w-28 h-16 rounded-lg overflow-hidden transition-all duration-300 ease-in-out  ${
        selected ? "border-2 border-primary" : "border-2 border-transparent"
      }`}
    >
      <img
        className="w-full h-full object-cover"
        src={slide}
        alt={`Thumbnail ${slide}`}
      />
      {selected && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
