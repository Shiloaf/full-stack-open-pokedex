import React from "react";
import type { SerializedError } from "@reduxjs/toolkit";

const ErrorMessage = ({ error }: { error: SerializedError }) => (
  <div data-testid="error">
    {error.name}
    {error.message}
    {error.stack}
    {error.code}
  </div>
);

export default ErrorMessage;
