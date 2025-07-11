import React from "react";
import { Outlet } from "react-router-dom";
import useAuthStore from "../../../store/auth.js";

function AdminLayout() {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || user?.role !== "admin") {
        return <div style={{ color: "red", marginTop: "2rem", textAlign: "center" }}>You are not authorized to view this page.</div>;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default AdminLayout; 