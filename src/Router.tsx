

import React from "react";
import Father from "./components/Father";
import GrandMother from "./components/GrandMother";
import GrandFather from "./components/GrandFather";
import Applayout from "./components/Applayout";
import { createBrowserRouter } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Box
                    sx={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        zIndex: 1000, 
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "300px", 
                            backgroundColor: "rgba(255, 255, 255, 0.9)", 
                            borderRadius: "8px",
                            padding: "20px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <Applayout />
                    </Box>
                </Box>
            </>
        ),
        errorElement: <>main error</>,
        children: [
            {
                path: 'grandfather',
                element: <GrandFather />,
                children: [
                    { path: 'father', element: <Father /> },
                ],
            },
            {
                path: 'grandmother',
                element: <GrandMother />,
            },
        ],
    },
]);


