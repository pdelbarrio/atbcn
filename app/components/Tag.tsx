import React from "react";

interface Prop {
  tag: string;
}

export default function Tag({ tag }: Prop) {
  return (
    <span className="px-2 py-1 bg-gray-600 rounded-full text-xs font-semibold text-white mr-2">
      {tag}
    </span>
  );
}
