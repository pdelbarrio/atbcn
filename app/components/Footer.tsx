import React from "react";

type FooterProps = {
  onNextWeek: () => void;
  onPreviousWeek: () => void;
};

export const Footer: React.FC<FooterProps> = ({
  onNextWeek,
  onPreviousWeek,
}) => {
  return (
    <div className="max-w-screen-sm mx-auto px-4">
      <div className="flex justify-between py-4">
        <button className="border p-2" onClick={onPreviousWeek}>
          Previous Week
        </button>
        <button className="border p-2" onClick={onNextWeek}>
          Next Week
        </button>
      </div>
    </div>
  );
};
