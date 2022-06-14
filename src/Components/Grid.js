import React from "react";
import "../styles/Grid.css";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Grid({ setSelectedRows, details }) {
  const [pageSize, setPageSize] = React.useState(5);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  const columns = [
    {
      field: "id",
      headerName: "Sl no",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "business_code",
      headerName: "Business Code",
      headerAlign: "left",
     align: "center",
      minWidth: 100,
    },
    {
      field: "cust_number",
      headerName: "Customer Number",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "clear_date",
      headerName: "Clear Date",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "buisness_year",
      headerName: "Buisness Year",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },

    {
      field: "doc_id",
      headerName: "Document Id",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "posting_date",
      headerName: "Posting Date",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },

    {
      field: "document_create_date",
      headerName: "Document Create Date",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "due_in_date",
      headerName: "Due In Date",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "invoice_currency",
      headerName: "Invoice Currency",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "document_type",
      headerName: "Document Type",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "posting_id",
      headerName: "Posting Id",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "total_open_amount",
      headerName: "Total Open Amount",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "baseline_create_date",
      headerName: "Baseline Create Date",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "cust_payment_terms",
      headerName: "Customer Payment Terms",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "invoice_id",
      headerName: "Invoice Id",
      headerAlign: "center",
     align: "center",
      minWidth: 100,
    },
    {
      field: "aging_bucket",
      headerName: "Predicted Payment Date",
      headerAlign: "center",
     align: "center",
      minWidth: 150
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
         
          width: "100%",
          paddingTop: "1rem",
          textAlign: "center",
          
  backgroundColor:"#2a3e4c"
        }}
        id="table"
      >
        <DataGrid
          rows={details}
          columns={columns}
          rowHeight={35}
          autoHeight 
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 15]}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          pagination
          getRowId={details.id}
          checkboxSelection={true}
          color="primary"
          headerHeight={100}
          align="center"
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              textOverflow: "clip",
              whiteSpace: "break-spaces",
              lineHeight: 2,
            },
          }}//to change column title
          onSelectionModelChange={(ids) => {
            console.log(ids);
            const selectedIDs = new Set(ids);
            const selectedRows = details.filter((row) => selectedIDs.has(row.id) );
            

            setSelectedRows(selectedRows);
          }}
          disableColumnSelector
          disableColumnFilter
        />
      </div>
    </ThemeProvider>
  );
}
