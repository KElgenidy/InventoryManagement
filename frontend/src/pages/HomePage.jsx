import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function HomePage() {
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Sidebar />
        </Box>
        <Outlet />
        </>
    )
}