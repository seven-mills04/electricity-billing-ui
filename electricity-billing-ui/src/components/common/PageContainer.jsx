import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const PageContainer = ({ children, sx = {}, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Box sx={{ width: "100%", ...sx }} {...props}>
        {children}
      </Box>
    </motion.div>
  );
};

export default PageContainer;
