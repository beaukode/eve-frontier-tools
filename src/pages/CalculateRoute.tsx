import React from "react";
import { Alert, Box, Grid2 as Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import PaperLevel1 from "@/components/ui/PaperLevel1";
import ExternalLink from "@/components/ui/ExternalLink";
import { getCalcPathFromTo } from "@/api/evedatacore";
import RoutePlannerForm from "./Calculators/RoutePlannerForm";
import RoutePlannerRoute from "./Calculators/RoutePlannerRoute";
import { useSolarSystemsIndex } from "@/contexts/AppContext";

type SubmitHandler = React.ComponentProps<typeof RoutePlannerForm>["onSubmit"];
type RoutePlannerFormData = Parameters<SubmitHandler>[0];

const CalculateRoute: React.FC = () => {
  const [queryData, setQueryData] = React.useState<RoutePlannerFormData>();
  const solarSystemsIndex = useSolarSystemsIndex();

  const query = useQuery({
    queryKey: ["CalculateRoute", queryData],
    queryFn: async () => {
      if (!queryData) return;
      return getCalcPathFromTo({
        path: {
          from: queryData.system1.id,
          to: queryData.system2.id,
        },
        query: {
          jumpDistance: queryData.jumpDistance,
          optimize: queryData.optimize,
          useSmartGates: queryData.useSmartGates,
        },
      }).then((r) => {
        if (r.error) {
          throw new Error(r.error.message);
        }
        return r.data.path;
      });
    },
    retry: false,
    enabled: !!queryData,
  });

  const handleSubmit: SubmitHandler = React.useCallback((data) => {
    setQueryData(data);
  }, []);

  return (
    <Box p={2} flexGrow={1} overflow="auto">
      <Helmet>
        <title>Route planner</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PaperLevel1 title="Route planner" loading={!solarSystemsIndex}>
            {solarSystemsIndex && (
              <RoutePlannerForm
                onSubmit={handleSubmit}
                solarSystemsIndex={solarSystemsIndex}
              />
            )}
          </PaperLevel1>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {!!queryData && (
            <PaperLevel1
              title={`Your trip to ${queryData.system2.label}`}
              loading={query.isLoading}
            >
              {query.isError && (
                <Alert severity="error">{query.error.message}</Alert>
              )}
              {query.isSuccess && query.data && (
                <Box>
                  <RoutePlannerRoute data={query.data} />
                </Box>
              )}
            </PaperLevel1>
          )}
        </Grid>
      </Grid>
      <Alert severity="info">
        This calculator is based on the work of Shish, from his website{" "}
        <ExternalLink
          title="EVE Frontier Toolbox"
          href="https://eftb.shish.io/"
        />{" "}
        and its source code
        <br />
        <br />
        If you enjoy this calculator, please consider supporting him by buying a
        coffee at{" "}
        <ExternalLink title="Buy a coffee" href="https://ko-fi.com/shish2k" />
      </Alert>
    </Box>
  );
};

export default CalculateRoute;
