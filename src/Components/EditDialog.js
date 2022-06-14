import React from "react";
import { useState } from "react";
import { Modal, Box, TextField } from "@mui/material";
import axios from "axios";

export default function EditDialog({
  selectedRows,
  ifEdit,
  setEdit,
  style,
  handleRefresh,
}) {
  const [cpt, setCpt] = useState("");
  const [currency, setCurrency] = useState("");

  /**HANDLE EDIT **/
  let handleEdit = async (e) => {
    e.preventDefault();

    //currency and cpt is a local state for getting input

    axios
      .post("http://localhost:8080/HRCFinal1/EditServlet", {
        invoice_currency: currency,
        cust_payment_terms: cpt,
        id: selectedRows[0].id,
      })
      .then((response) => {
        console.log(response);
        handleRefresh();
      });

    setEdit(false); // to close Modal
  };

  return (
    <Modal
      open={ifEdit}
      onClose={() => setEdit(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="box-container">
          <div>
            <p>Edit</p>
          </div>
          <div className="box-form">
            <form onSubmit={handleEdit} className="flex-between">
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="invoice_currency"
                name="invoice_currency"
                variant="standard"
                value={currency}
                style={{ width: "45%" }}
                onChange={(e) => setCurrency(e.target.value)}
              />

              <TextField
                sx={{
                  margin: 1,

                  bgcolor: "white",
                  borderRadius: "5px",
                }}
                required
                id="filled-required"
                name="cust_payment_terms"
                label="cust_payment_terms"
                variant="standard"
                value={cpt}
                style={{ width: "45%" }}
                onChange={(e) => setCpt(e.target.value)}
              />

              <button type="submit" className="span-cancel">
                EDIT
              </button>
              <button className="span-cancel" onClick={() => setEdit(false)}>
                CANCEL
              </button>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
