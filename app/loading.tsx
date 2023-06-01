"use client";

import { Ping } from "@uiball/loaders";

export default function loading() {
  return (
    <div className="flex justify-center">
      <Ping size={150} color="#131111" />
    </div>
  );
}
