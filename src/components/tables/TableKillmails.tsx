import React from "react";
import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMudSql } from "@/contexts/AppContext";
import PaperLevel1 from "@/components/ui/PaperLevel1";
import DisplaySolarsystem from "../DisplaySolarsystem";
import DisplayOwner from "../DisplayOwner";
import { ldapDate } from "@/tools";

interface TableKillmailsProps {
  characterId?: string;
}

const TableKillmails: React.FC<TableKillmailsProps> = ({ characterId }) => {
  const mudSql = useMudSql();

  const query = useQuery({
    queryKey: ["Killmails", characterId],
    queryFn: async () => mudSql.listKillmails({ characterId }),
    enabled: !!characterId,
  });

  return (
    <PaperLevel1 title="Killmails" loading={query.isFetching}>
      {query.data && (
        <>
          {query.data.length === 0 && (
            <Typography variant="body1">None</Typography>
          )}
          {query.data.length > 0 && (
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Killer</TableCell>
                  <TableCell>Victim</TableCell>
                  <TableCell>Loss Type</TableCell>
                  <TableCell>Solar System</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {query.data.map((km) => {
                  const isoDate = ldapDate(km.timestamp).toISOString();
                  const date = isoDate.substring(0, 10);
                  const time = isoDate.substring(11, 19);
                  return (
                    <TableRow key={km.id}>
                      <TableCell>{`${date} ${time}`}</TableCell>
                      <TableCell>
                        <DisplayOwner
                          name={km.killerName}
                          address={km.killerAddress}
                        />
                      </TableCell>
                      <TableCell>
                        <DisplayOwner
                          name={km.victimName}
                          address={km.victimAddress}
                        />
                      </TableCell>
                      <TableCell>{km.lossType}</TableCell>
                      <TableCell>
                        <DisplaySolarsystem solarSystemId={km.solarSystemId} />
                      </TableCell>
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

export default TableKillmails;