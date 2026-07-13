import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = () => {

    const data = {

        labels: [
            "Paid",
            "Pending",
            "Overdue"
        ],

        datasets: [
            {
                data: [65,25,10],

                backgroundColor: [
                    "#2e7d32",
                    "#ed6c02",
                    "#d32f2f",
                ],
            },
        ],
    };

    return <Pie data={data} />;
};

export default PieChart;