import React from "react";
import {
  Typography,
  Paper,
  LinearProgress,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

interface RootPaperProps {
  title: string;
  loading?: boolean;
  mudChip?: boolean;
  backButton?: boolean;
  children?: React.ReactNode;
}

const PaperLevel1: React.FC<RootPaperProps> = ({
  title,
  loading,
  backButton,
  mudChip,

  children,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="h6"
        component="h2"
        sx={{ bgcolor: "background.default" }}
        gutterBottom
      >
        {backButton && (
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <BackIcon />
          </IconButton>
        )}
        {title}
        {mudChip && (
          <Chip
            label="Mud"
            size="small"
            sx={{
              ml: 2,
              backgroundColor: "#ff7612",
              color: "white",
              fontWeight: "bold",
            }}
          />
        )}
      </Typography>
      {loading && (
        <Box sx={{ position: "relative" }}>
          <LinearProgress
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          />
        </Box>
      )}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        {children}
      </Paper>
    </>
  );
};

export default PaperLevel1;
