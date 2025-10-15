import { useState } from "react";

interface DescriptionProps {
  description: string;
  limit?: number;
}

function Description({ description, limit = 180 }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > limit;
  const visibleText = expanded ? description : description.slice(0, limit);

  return (
    <span className="text-sm whitespace-pre-line">
      {visibleText}
      {isLong && (
        <>
          {!expanded && "... "}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary hover:underline ml-1 "
          >
            {expanded ? "See less" : "See more"}
          </button>
        </>
      )}
    </span>
  );
}

export default Description;
