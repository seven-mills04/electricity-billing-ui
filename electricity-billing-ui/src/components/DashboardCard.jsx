import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ title, value, color }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        borderLeft: `6px solid ${color}`,
      }}
    >
      <CardContent>
        <Typography color="text.secondary">
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mt: 2,
            fontWeight: "bold",
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;