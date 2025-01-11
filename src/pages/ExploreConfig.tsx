import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Paper,
  LinearProgress,
  List,
  Typography,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { startCase } from "lodash-es";
import { getConfig } from "@/api/stillness";
import ListItemLink from "@/components/ui/ListItemLink";
import BasicListItem from "@/components/ui/BasicListItem";

const ExploreConfig: React.FC = () => {
  const query = useQuery({
    queryKey: ["Config"],
    queryFn: async () => await getConfig().then((r) => r.data.pop()),
  });

  const data = query.data;
  return (
    <Box p={2} flexGrow={1} overflow="auto">
      <Helmet>
        <title>Config</title>
      </Helmet>
      <Typography
        variant="h6"
        component="h2"
        sx={{ bgcolor: "background.default" }}
        gutterBottom
      >
        {data?.name || "..."}
      </Typography>
      <Paper elevation={1} sx={{ mb: 2 }}>
        <LinearProgress
          sx={{ visibility: query.isFetching ? "visible" : "hidden" }}
        />
        {!query.isLoading && data && (
          <Box>
            <List sx={{ width: "100%", overflow: "hidden" }}>
              <BasicListItem title="Chain Id">{data.chainId}</BasicListItem>
              <BasicListItem title="Native Currency">
                {data.nativeCurrency?.name} [{data.nativeCurrency?.symbol}]{" "}
                {data.nativeCurrency?.decimals} decimals
              </BasicListItem>
              <BasicListItem title="Fuel type" disableGutters>
                <Button
                  variant="outlined"
                  component={NavLink}
                  to={`/explore/types/${data.itemTypeIDs?.fuel}`}
                >
                  {data.itemTypeIDs?.fuel}
                </Button>
              </BasicListItem>
              <ListItemLink
                title="Block Explorer"
                href={data.blockExplorerUrl}
              />
              <ListItemLink title="Metadata Api" href={data.metadataApiUrl} />
              <ListItemLink title="Ipfs" href={data.ipfsApiUrl} />
              <ListItemLink title="Indexer" href={data.indexerUrl} />
              <ListItemLink title="Wallet Api" href={data.walletApiUrl} />
              <ListItemLink title="Vault Dapp" href={data.vaultDappUrl} />
              <ListItemLink title="Base Dapp" href={data.baseDappUrl} />
            </List>
          </Box>
        )}
      </Paper>
      {!query.isLoading && data && (
        <>
          <Typography
            variant="h6"
            component="h2"
            sx={{ bgcolor: "background.default" }}
            gutterBottom
          >
            Rpc
          </Typography>
          <Paper elevation={1} sx={{ mb: 2 }}>
            {Object.entries(data.rpcUrls || {}).map(([key, value]) => (
              <>
                <ListItemLink
                  title={startCase(`${key} Http`)}
                  href={value.http}
                />
                <ListItemLink
                  title={startCase(`${key} WebSocket`)}
                  href={value.webSocket}
                />
              </>
            ))}
          </Paper>
          <Typography
            variant="h6"
            component="h2"
            sx={{ bgcolor: "background.default" }}
            gutterBottom
          >
            Contracts
          </Typography>
          <Paper elevation={1} sx={{ mb: 2 }}>
            <List sx={{ width: "100%" }}>
              {Object.entries(data.contracts || {}).map(([key, value]) => {
                return typeof value === "string" ? (
                  <BasicListItem title={startCase(key)}>{value}</BasicListItem>
                ) : (
                  <BasicListItem title={startCase(key)}>
                    {value.address}
                  </BasicListItem>
                );
              })}
            </List>
          </Paper>
          <Typography
            variant="h6"
            component="h2"
            sx={{ bgcolor: "background.default" }}
            gutterBottom
          >
            Systems
          </Typography>
          <Paper elevation={1} sx={{ mb: 2 }}>
            <List sx={{ width: "100%" }}>
              {Object.entries(data.systems || {}).map(([key, value]) => (
                <BasicListItem title={startCase(key)}>{value}</BasicListItem>
              ))}
            </List>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default ExploreConfig;
