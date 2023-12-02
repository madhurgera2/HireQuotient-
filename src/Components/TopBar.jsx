import { IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const TopBar = ({ rows, setRows, allRows, deleteSelected }) => {
  const [searchString, setSearchString] = React.useState("");
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchString.length >= 3) {
        const filtered = rows.filter((row) => {
          const nameMatch = row.name
            .toLowerCase()
            .includes(searchString.toLowerCase());
          const emailMatch = row.email
            .toLowerCase()
            .includes(searchString.toLowerCase());
          const roleMatch = row.role
            .toLowerCase()
            .includes(searchString.toLowerCase());
          return nameMatch || emailMatch || roleMatch;
        });
        setRows(filtered);
      } else if (
        searchString.length == 0 &&
        Array.isArray(allRows) &&
        allRows.length > 0
      ) {
        setRows(allRows);
      }
    }, 950);
    return () => clearTimeout(delayTimer);
  }, [searchString]);
  return (
    <div style={{ width: "full", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <TextField
        id="outlined-basic"
        label="Search by Name, Email or Role"
        variant="outlined"
        inputProps={{
            autoComplete: 'off',
          }}
        value={searchString}
        helperText="Please enter atleast 3 or more characters to search"
        onChange={(e) => setSearchString(e.target.value)}
      />
      <IconButton aria-label="delete" size="large" onClick={deleteSelected}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TopBar;
