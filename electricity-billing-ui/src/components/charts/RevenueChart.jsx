import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const RevenueChart = () => {

    const data = {
        labels: ["Jan","Feb","Mar","Apr","May","Jun"],

        datasets: [
            {
                label: "Revenue",
                data: [12000,19000,16000,25000,32000,41000],
                borderColor: "#1976d2",
                backgroundColor: "rgba(25,118,210,0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    return <Line data={data} />;
};

export default RevenueChart;