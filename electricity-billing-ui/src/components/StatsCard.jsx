import { Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ title, value, color }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
        borderLeft: `6px solid ${color}`,
        boxShadow: 3,
        transition: "all .25s ease",
        height: "100%",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent
        sx={{
          py: 3,
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            fontWeight: 600,
            letterSpacing: 0.4,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mt: 1,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;