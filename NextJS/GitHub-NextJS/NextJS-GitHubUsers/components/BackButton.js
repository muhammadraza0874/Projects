import React from "react";
import { ChevronLeftRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

function BackButton() {
  return (
    <>
      <Button className="btn backBtn" startIcon={<ChevronLeftRounded />}>
        Back
      </Button>
    </>
  );
}

export default BackButton;
