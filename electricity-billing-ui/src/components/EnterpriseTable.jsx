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
        border: "1px solid rgba(255, 255, 255, 0.08)",
        bgcolor: "rgba(15, 23, 42, 0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflow: "hidden",
      }}
    >
      
      <Box sx={{ p: 2.5, borderBottom: "1px solid rgba(255, 255, 255, 0.06)", bgcolor: "transparent" }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={2}>
          <Box>
            {title && (
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 500 }}>
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
                      <Search size={16} color="#94A3B8" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: "260px" },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                  },
                }}
              />
            )}
            {actions}
          </Stack>
        </Stack>
      </Box>

      
      <TableContainer sx={{ maxHeight: "640px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field || col.headerName}
                  align={col.align || "left"}
                  style={{ width: col.width }}
                  sx={{ bgcolor: "rgba(13, 27, 42, 0.95)", borderBottom: "2px solid rgba(255, 255, 255, 0.08)", color: "#94A3B8" }}
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
                    <Inbox size={36} color="#64748B" />
                    <Typography variant="body2" sx={{ color: "#94A3B8", fontWeight: 600 }}>
                      No Records Found
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748B" }}>
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
                    "&:hover": { bgcolor: "rgba(6, 182, 212, 0.06) !important" },
                    transition: "bgcolor 0.15s ease",
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.field} align={col.align || "left"} sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                      {col.renderCell ? col.renderCell(row) : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      
      {onPageChange && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", bgcolor: "transparent", color: "#94A3B8" }}
        />
      )}
    </Paper>
  );
};

export default EnterpriseTable;
