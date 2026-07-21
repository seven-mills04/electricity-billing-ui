import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  InputAdornment,
  TablePagination,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { Search, Inbox } from "lucide-react";

const EnterpriseTable = ({
  columns = [],
  rows = [],
  searchQuery = "",
  onSearchChange,
  searchPlaceholder = "Search records...",
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
  actions,
  title,
  subtitle,
}) => {
  const displayRows = rows;
  const count = totalCount !== undefined ? totalCount : rows.length;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Header bar with title and search */}
      <Box sx={{ p: 2.5, borderBottom: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={2}>
          <Box>
            {title && (
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A" }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 500 }}>
                {subtitle}
              </Typography>
            )}
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            {onSearchChange && (
              <TextField
                size="small"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color="#64748B" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: "260px" },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F8FAFC",
                    borderRadius: "10px",
                  },
                }}
              />
            )}
            {actions}
          </Stack>
        </Stack>
      </Box>

      {/* Table Content */}
      <TableContainer sx={{ maxHeight: "640px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field || col.headerName}
                  align={col.align || "left"}
                  style={{ width: col.width }}
                  sx={{ bgcolor: "#F8FAFC" }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {displayRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                  <Stack spacing={1} alignItems="center">
                    <Inbox size={36} color="#94A3B8" />
                    <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 600 }}>
                      No Records Found
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                      Try adjusting your search query or filter parameters.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              displayRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                <TableRow
                  hover
                  key={row.id || idx}
                  sx={{
                    "&:hover": { bgcolor: "rgba(2, 132, 199, 0.03)" },
                    transition: "bgcolor 0.15s ease",
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.field} align={col.align || "left"}>
                      {col.renderCell ? col.renderCell(row) : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Footer */}
      {onPageChange && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          sx={{ borderTop: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}
        />
      )}
    </Paper>
  );
};

export default EnterpriseTable;
