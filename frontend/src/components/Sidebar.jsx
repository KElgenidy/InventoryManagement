import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import BoltIcon from '@mui/icons-material/Bolt';
import { useNavigate } from "react-router-dom";


const drawerWidth = 200;

const pages = [
  {
    id: 0,
    name: "Warehouses",
    icon: <WarehouseIcon />,
    link: "/warehouses"
  },
  {
    id: 1,
    name: "Inventory",
    icon: <InventoryIcon />,
    link: "/inventory"
  },
  {
    id: 2,
    name: "Products",
    icon: <BoltIcon />,
    link: "/products"
  },
  {
    id: 3,
    name: "Purchase Orders",
    icon: <ShoppingCartIcon />,
    link: "/purchases"
  }, 
  {
    id: 4,
    name: "Sales Orders",
    icon: <ReceiptIcon />,
    link: "/sales"
  }
  
]

export default function Sidebar() {

  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid size={3}>
        <Drawer variant="permanent" sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}>
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {
                pages.map((page) => (
                  <List key={page.id} >
                    <ListItem button onClick={() => navigate(page.link)}>
                      <ListItemIcon>
                        {page.icon}
                      </ListItemIcon>
                      <ListItemText primary={page.name} />
                    </ListItem>
                  </List>
                ))
              }
            </List>
          </Box>
        </Drawer>
      </Grid>
    </Grid>
  );
}