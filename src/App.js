import React, { useEffect, useState } from "react";
import "./App.css";
import AdminTable from "./Components/AdminTable";
import TopBar from "./Components/TopBar";

function App() {
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);

  const [selection, setSelection] = React.useState([]);
  const deleteSelected = () => {
    console.log({ selection });
    setRows(rows.filter((row) => !selection.includes(row.id)));
  };
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
        setAllRows(data);
      });
  }, []);

  useEffect(() => {
    console.log("Rows Changed...");
  }, [rows]);
  return (
    <div style={{ height: "screen", padding: "20px" }}>
      <p style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}>
        Madhur's HireQuotient Assignment
      </p>
      <p style={{textAlign:"center"}}><a href="mailto:madhurgera2@gmail.com" >madhurgera2@gmail.com</a></p>
      <TopBar
        rows={rows}
        setRows={setRows}
        allRows={allRows}
        deleteSelected={deleteSelected}
      />
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <AdminTable
          rows={rows}
          setRows={setRows}
          selection={selection}
          setSelection={setSelection}
        />
      </div>
    </div>
  );
}

export default App;
