import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

function AddEditBtn({ link, title, showTitle, icon, showIcon }) {
  const styles = {
    button: {
      textTransform: "capitalize",
      "& .MuiSvgIcon-root": {
        width: 16,
        height: 16,
      },
    },
  };
  return (
    <Link href={link} passHref>
      <Button variant="contained" component="a" sx={styles.button}>
        {showIcon && icon}
        {showTitle && title}
      </Button>
    </Link>
  );
}

export default AddEditBtn;
