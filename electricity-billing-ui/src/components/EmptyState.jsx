import { Box, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

const EmptyState = ({ message = "No Data Found" }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="250px"
    >
      <InboxIcon sx={{ fontSize: 80, color: "#bdbdbd" }} />

      <Typography
        variant="h6"
        color="text.secondary"
        mt={2}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;