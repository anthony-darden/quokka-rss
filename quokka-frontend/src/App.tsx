import { useState } from "react";
import { useFeeds } from "./hooks/useFeeds";

import { Header, Select } from "./components";
import {
  Box,
  Container,
  CircularProgress,
  Button,
  Pagination,
} from "@mui/material";
import { TAG_OPTIONS } from "./constants";
import { FeedCard } from "./components/FeedCard";

function App() {
  const [tagName, setTagName] = useState<string>("dev");
  const [page, setPage] = useState(1);
  const {
    data,
    isFetching,
    refetch,
    mutate: updateAsRead,
  } = useFeeds({
    tagName,
    page,
    pageSize: 10,
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Header />
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Box width={"100%"} mt={3} mb={2}>
          <Select
            options={TAG_OPTIONS}
            value={tagName}
            onChange={(e) => setTagName(e.target.value as string)}
            label="Medium Tag Name"
          />
        </Box>
        <Box mb={2}>
          <Button onClick={() => refetch()} variant="contained">
            Refresh
          </Button>
        </Box>
        {isFetching ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent="space-evenly"
            >
              {data?.feeds.map((feed) => (
                <FeedCard
                  feed={feed}
                  key={feed.id}
                  updateAsRead={updateAsRead}
                />
              ))}
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
              <Pagination
                count={data?.totalPages}
                page={page}
                onChange={handleChange}
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}

export default App;
