import React from "react";
import { Feed } from "../../types";
import { Box, Typography } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";

type Props = {
  feed: Feed;
  updateAsRead: UseMutateFunction<Feed, Error, string, unknown>;
};
export const FeedCard: React.FC<Props> = (props) => {
  const {
    updateAsRead,
    feed: { title, pubDate, link, isRead, description, id },
  } = props;

  const handleClick = () => {
    updateAsRead(id.toString());
    window.open(link, "_blank");
  };

  return (
    <Box
      sx={{
        width: "500px",
        border: `2px solid ${isRead ? "gray" : "black"}`,
        padding: 2,
        borderRadius: 1,
        marginBottom: 2,
        marginRight: 2,
        "&: hover": {
          cursor: "pointer",
          boxShadow: "3px 3px 3px",
        },
        color: isRead ? "gray" : "black",
      }}
      onClick={handleClick}
    >
      <Box>
        {!isRead && <Typography color="error">New!</Typography>}
        <Typography variant="h4">{title}</Typography>
        <Typography>{new Date(pubDate).toDateString()}</Typography>
      </Box>
      <Box
        sx={{
          "& img": {
            width: "400px",
          },
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Box>
    </Box>
  );
};
