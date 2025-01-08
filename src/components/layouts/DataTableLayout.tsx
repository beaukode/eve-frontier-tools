import React from "react";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import DataTable, { DataTableItemContentCallback } from "../DataTable";

interface DataTableLayoutProps<T extends Record<string, unknown>> {
  title: string;
  columns: string[];
  loading?: boolean;
  data: T[];
  itemContent: DataTableItemContentCallback<T>;
  children?: React.ReactNode;
}

const DataTableLayout = <T extends Record<string, unknown>>({
  title,
  columns,
  loading,
  data,
  itemContent,
  children,
}: DataTableLayoutProps<T>) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box p={2} flexGrow={1} overflow="hidden">
        <Paper
          elevation={1}
          sx={{
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box display="flex" alignItems="flex-end">
            <Box>{children}</Box>
            <Box flexGrow={1} textAlign="right">
              <Typography variant="caption" color="textPrimary">
                {data.length} {title}
              </Typography>
            </Box>
          </Box>
          <Box mt={2}>
            <LinearProgress
              sx={{ visibility: loading ? "visible" : "hidden" }}
            />
          </Box>
          <DataTable
            data={data}
            columns={columns}
            itemContent={itemContent}
            rememberScroll
          />
        </Paper>
      </Box>
    </>
  );
};

export default DataTableLayout;
