import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const DataTable = ({ rows, columns }) => {
  return (
    <Paper elevation={3} sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;