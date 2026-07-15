import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ paidBills, unpaidBills }) => {
  const data = {
    labels: [
      "Paid Bills",
      "Unpaid Bills",
    ],

    datasets: [
      {
        data: [
          paidBills,
          unpaidBills,
        ],

        backgroundColor: [
          "#2e7d32",
          "#ed6c02",
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
    },

    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <Pie
      data={data}
      options={options}
    />
  );
};

export default PieChart;