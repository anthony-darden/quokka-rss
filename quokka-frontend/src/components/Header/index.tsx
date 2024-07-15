import { AppBar, Container, Toolbar, Box, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box>
            <Typography variant="h4">Medium RSS FEED</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
