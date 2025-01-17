import React from "react";
import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  Box,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMudSql } from "@/contexts/AppContext";
import PaperLevel1 from "@/components/ui/PaperLevel1";
import ButtonAssembly from "../buttons/ButtonAssembly";
import DisplayAssemblyIcon from "../DisplayAssemblyIcon";
import ButtonSolarsystem from "../buttons/ButtonSolarsystem";

interface TableAssembliesProps {
  owner?: string;
  solarSystemId?: string;
}

const TableAssemblies: React.FC<TableAssembliesProps> = ({
  owner,
  solarSystemId,
}) => {
  const [showUnanchored, setShowUnanchored] = React.useState(false);
  const mudSql = useMudSql();

  const queryByOwner = useQuery({
    queryKey: ["AssembliesByOwner", owner],
    queryFn: async () => mudSql.listAssemblies({ owners: owner }),
    staleTime: 1000 * 60,
    retry: false,
  });

  const queryBySolarSystem = useQuery({
    queryKey: ["AssembliesBySolarSystem", solarSystemId],
    queryFn: async () => mudSql.listAssemblies({ solarSystemId }),
    staleTime: 1000 * 60,
    retry: false,
  });

  const query = owner ? queryByOwner : queryBySolarSystem;

  const assemblies = React.useMemo(() => {
    if (!query.data) return undefined;
    if (showUnanchored) return query.data;
    return query.data.filter((a) => a.state === 2 || a.state === 3);
  }, [query.data, showUnanchored]);

  return (
    <PaperLevel1
      title="Assemblies"
      loading={query.isFetching}
      titleAdornment={
        <FormControlLabel
          control={
            <Switch
              value={showUnanchored}
              onChange={(e) => setShowUnanchored(e.target.checked)}
            />
          }
          label="Show Unanchored & Destroyed"
        />
      }
    >
      {query.isError && (
        <Alert severity="error">
          Error loading assemblies, contact me if the error is permanent for
          this user
        </Alert>
      )}
      {assemblies && (
        <>
          {assemblies.length === 0 && (
            <Typography variant="body1">None</Typography>
          )}
          {assemblies.length > 0 && (
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell width={180}>Solar system</TableCell>
                  <TableCell width={250}>Anchored At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assemblies.map((sa) => {
                  const isoDate = new Date(sa.anchoredAt).toISOString();
                  const date = isoDate.substring(0, 10);
                  const time = isoDate.substring(11, 19);
                  return (
                    <TableRow key={sa.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <DisplayAssemblyIcon
                            typeId={sa.typeId}
                            stateId={sa.state}
                            tooltip
                          />
                          <ButtonAssembly id={sa.id} name={sa.name} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <ButtonSolarsystem solarSystemId={sa.solarSystemId} />
                      </TableCell>
                      <TableCell>{`${date} ${time}`}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </PaperLevel1>
  );
};

export default TableAssemblies;
