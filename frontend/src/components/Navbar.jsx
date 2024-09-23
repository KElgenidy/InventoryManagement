import { AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Navbar() {
  return (
    <Grid container spacing={2}>
			<CssBaseline />
      <Grid size={12}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Inventory Management System
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
}
