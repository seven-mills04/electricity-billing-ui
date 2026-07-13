import { Stack, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ActionButtons = ({
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="View">
        <IconButton color="primary" onClick={onView}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit">
        <IconButton color="warning" onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ActionButtons;