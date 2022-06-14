import React from "react";
import { useState } from "react";
import { Modal, Box, TextField } from "@mui/material";

export default function AdvancedDialog({
  ifAdvance,
  setDetails,
  setAdvance,
  details,
  style,
  handleRefresh,
}) {
  const [docId, setDocId] = useState("");
  const [cnum, setCnum] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [byear, setByear] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    if (cnum === "" && byear === "" && docId === "" && invoiceId === "") {
      handleRefresh();
    } else {
      const arr = details.filter((item) => {
        if (
          item.cust_number.includes(cnum) &&
          item.buisness_year.includes(byear) &&
          item.doc_id.includes(docId) &&
          item.invoice_id.includes(invoiceId)
        ) {
          return item;
        }
        return null;
      });

      console.log(arr.length);

      setDetails(arr);
      setAdvance(false);
      window.alert("Search Succesful");
    }
  };

  return (
    <Modal
      open={ifAdvance}
      onClose={() => setAdvance(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="box-container">
          <div>
            <p>Advance Search</p>
          </div>
          <div className="box-form">
            <form onSubmit={handleSearch} className="flex-between">
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                id="filled"
                label="Document Id"
                name="doc_id"
                variant="standard"
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                style={{ width: "45%" }}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                id="filled"
                label="Invoice Id"
                name="invoice_id"
                variant="standard"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                style={{ width: "45%" }}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                id="filled"
                label="Customer Number"
                name="cust_number"
                variant="standard"
                value={cnum}
                onChange={(e) => setCnum(e.target.value)}
                style={{ width: "45%" }}
              />

              <TextField
                sx={{
                  margin: 1,

                  bgcolor: "white",
                  borderRadius: "5px",
                }}
                id="filled"
                name="buisness_year"
                label="Business Year"
                variant="standard"
                value={byear}
                onChange={(e) => setByear(e.target.value)}
                style={{ width: "45%" }}
              />

              <button type="submit" className="span-cancel">
                SEARCH
              </button>
              <button className="span-cancel" onClick={() => setAdvance(false)}>
                CANCEL
              </button>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
