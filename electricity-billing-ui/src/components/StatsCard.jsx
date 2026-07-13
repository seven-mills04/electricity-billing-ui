import { Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ title, value, color }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderLeft: `6px solid ${color}`,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={1}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;