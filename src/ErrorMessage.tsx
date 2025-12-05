import React from "react";

const ErrorMessage = ({ error }: { error: Object }) => (
  <div data-testid="error">An error occured: {error.toString()}</div>
);

export default ErrorMessage;
