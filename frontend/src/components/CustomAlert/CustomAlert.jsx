import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react';
import { Snackbar, Alert, Box, LinearProgress } from "@mui/material";

function CustomAlert() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <Box
                sx={{
                    position: "fixed", top: 0, left: 0, width: "100%",
                    height: "100vh", backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9998,
                }}
            />
            <Alert severity="success" variant="filled"
                sx={{
                    position: "fixed", top: 0, right: 0, bottom: 0, left: 0,
                    margin: "auto", width: "340px", height: "110px", display: "flex",
                    flexDirection: "row", justifyContent: "center", alignItems: "center",
                    fontSize: "1.1rem", zIndex: 9999, padding: 2,
                    boxSizing: "border-box", textAlign: "center",
                }}> ¡Te registraste exitosamente!

                <Box sx={{ fontSize: "12px", width: '100%', left: 0, bottom: 0, position: 'absolute', p: 1, mt: 3 }}>
                    Serás redirigido automáticamente en un instante...
                </Box>
                <LinearProgress color="inherit"
                    sx={{
                        position: "absolute", bottom: 0, left: 0,
                        width: "100%", height: 4, borderRadius: 0,
                    }}
                />
            </Alert>
        </>
    );
}

export default CustomAlert