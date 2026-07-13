import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        ml: "240px",
        width: "calc(100% - 240px)",
      }}
    >
      <Toolbar>
        <Typography variant="h6">
          Electricity Billing System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;