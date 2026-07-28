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
        borderRadius: "2px",
        border: "1px solid #C9C3B7",
        bgcolor: "#FFFDF8",
        overflow: "hidden",
      }}
    >
      
      {/* Header and Search Actions */}
      <Box sx={{ p: 2.5, borderBottom: "1px solid #C9C3B7", bgcolor: "transparent" }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={2}>
          <Box>
            {title && (
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#171717", fontSize: "1.1rem" }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
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
                      <Search size={16} color="#625F58" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: "260px" },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#FFFDF8",
                    borderRadius: "2px",
                    color: "#171717",
                    "& fieldset": { borderColor: "#C9C3B7" },
                    "&:hover fieldset": { borderColor: "#171717" },
                  },
                }}
              />
            )}
            {actions}
          </Stack>
        </Stack>
      </Box>

      {/* Table grid records */}
      <TableContainer sx={{ maxHeight: "640px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field || col.headerName}
                  align={col.align || "left"}
                  style={{ width: col.width }}
                  sx={{
                    bgcolor: "#E9E5DB",
                    borderBottom: "2px solid #C9C3B7",
                    color: "#171717",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    py: 2,
                  }}
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
                    <Inbox size={36} color="#625F58" />
                    <Typography variant="body2" sx={{ color: "#171717", fontWeight: 800 }}>
                      No Records Found
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#625F58" }}>
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
                    "&:hover": { bgcolor: "#F3F0E8 !important" },
                    transition: "bgcolor 120ms ease",
                  }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      align={col.align || "left"}
                      sx={{
                        borderBottom: "1px solid #C9C3B7",
                        color: "#171717",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        py: 1.8,
                      }}
                    >
                      {col.renderCell ? col.renderCell(row) : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      {onPageChange && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          sx={{
            borderTop: "1px solid #C9C3B7",
            bgcolor: "transparent",
            color: "#171717",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontWeight: 700,
              fontSize: "0.8rem",
            }
          }}
        />
      )}
    </Paper>
  );
};

export default EnterpriseTable;
