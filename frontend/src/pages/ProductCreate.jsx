import Grid from "@mui/material/Grid2";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductCreate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  console.log("Id: ", id);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Price:", price);
    console.log(typeof price);
    console.log("Description:", description);

    try {
      if (id !== "new") {
        const res = await api.put(`/api/product/update/${id}/`, {
          name,
          price,
          description,
        });
        console.log("Product updated:", res.data);
        alert("Product updated successfully!");
      } else {
        const res = await api.post("/api/product/create/", {
          name,
          price,
          description,
        });
        console.log("Product created:", res.data);
        alert("Product created successfully!");
        setName("");
        setPrice("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Operation failed. Please try again.");
    } finally {
      navigate("/products");
    }
  };

  const getProduct = async () => {
    try {
      const res = await api.get(`/api/product/${id}/`);
      setName(res.data.name);
      setPrice(res.data.price);
      setDescription(res.data.description);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  return (
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
      <Grid container>
        <Grid size={12}>
          {id !== "new"? (
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              Edit Product
            </Typography>
          ) : (
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              Create Product
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container>
              <Grid
                size={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TextField
                  fullWidth
                  label="Product Name"
                  sx={{
                    marginBottom: "1rem",
                    marginTop: "1rem",
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Product Price"
                  sx={{ marginBottom: "1rem" }}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <TextField
                  fullWidth
                  label="Product Description"
                  sx={{ marginBottom: "1rem" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {id != "new" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: "1rem" }}
                  >
                    Update Product
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: "1rem" }}
                  >
                    Create Product
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
