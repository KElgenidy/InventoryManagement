import { Box, Button, Typography, Paper, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import api from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const columns = [
//   { field: "id", headerName: "ID", width: 100 },
//   { field: "name", headerName: "Name", width: 150 },
//   { field: "price", headerName: "Price", width: 150 },
//   { field: "description", headerName: "Description", width: 150 },
// ];

// const paginationModel = {
//   page: 0,
//   pageSize: 5,
// };

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/product/delete/${id}/`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  const actions = (params) => {
    return (
      <Container
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "green" }}
          onClick={() => {
            navigate(`/product/details/${params.row.id}`);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red" }}
          onClick={() => {
            handleDelete(params.row.id);
          }}
        >
          Delete
        </Button>
      </Container>
    );
  };

  const getProducts = async () => {
    try {
      console.log("Fetching products...");
      const res = await api.get("/api/products/");
      console.log("API Response:", res);
      console.log("Products data:", res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products. Please try again.");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          width: "calc(100vw - 200px)",
          marginLeft: "200px",
          marginRight: "20px",
          marginTop: "45px",
          padding: "20px",
        }}
      >
        <Grid
          container
          sx={{
            borderBottom: "1px solid #ccc",
          }}
        >
          <Grid size={8}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              Products
            </Typography>
          </Grid>
          <Grid
            size={4}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
               navigate(`/product/details/new`);
              }}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid size={12}>
            {products.length > 0 ? (
              <Paper sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={products}
                  columns={[
                    { field: "id", headerName: "ID", width: 100 },
                    { field: "name", headerName: "Name", width: 220 },
                    { field: "price", headerName: "Price", width: 200 },
                    {
                      field: "description",
                      headerName: "Description",
                      width: 400,
                    },
                    {
                      field: "actions",
                      headerName: "Actions",
                      width: 200,
                      renderCell: actions,

                    },
                  ]}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                      fontSize: "1.4rem",
                    },
                    "& .MuiDataGrid-row": {
                        fontSize: "1.1rem",
                    
                    }
                  }}
                  
                />
              </Paper>
            ) : (
              <Typography variant="h2">No products found.</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
