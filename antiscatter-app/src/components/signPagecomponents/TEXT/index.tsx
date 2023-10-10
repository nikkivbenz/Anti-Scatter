import * as React from "react";

export const TEXT = ({
  characters,
  className,
}: {
  characters?: string;
  className?: string;
}) => {
  return (
    <>
      <p className={className}>{characters}</p>
    </>
  );
};
