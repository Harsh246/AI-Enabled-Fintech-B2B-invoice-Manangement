import React from "react";
import { Modal, Box } from "@mui/material";

export default function DeleteDialog({
  ifDelete,
  setDelete,
  handleRefresh,
  selectedRows,
  style,
}) {
  let handleDelete = async (e) => {
    e.preventDefault();

    // selectedRows is a prop which is an array of objects
    // having the details of the selected row

    console.log(selectedRows);

    let arr = [];
    // making an array of ids i.e sl_no selected

    for (let i = 0; i < selectedRows.length; i++) {
      arr.push(selectedRows[i].id);
    }

    console.log(arr);

    fetch("http://localhost:8080/HRCFinal1/deleteservlet", {
      method: "POST",
      body: JSON.stringify({
        ids: arr,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      handleRefresh();
    });

    setDelete(false); //this is used to close Modal
  };
  return (
    <Modal
      open={ifDelete}
      onClose={() => setDelete(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="box-container">
          <div>
            <p>Delete Records ?</p>
          </div>
          <div className="box-form">
            <div style={{ marginBottom: "2rem" }}>
              Are you sure you want to delete these record[s] ?
            </div>

            <button
              type="submit"
              className="span-cancel"
              onClick={handleDelete}
            >
              DELETE
            </button>
            <button className="span-cancel" onClick={() => setDelete(false)}>
              CANCEL
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
