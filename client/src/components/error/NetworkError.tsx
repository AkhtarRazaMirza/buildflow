"use client";

import ErrorCard from "./ErrorCard";

export default function NetworkError() {
  return (
    <ErrorCard
      title="Connection Error"
      description="Unable to communicate with the server. Please try again."
    />
  );
}