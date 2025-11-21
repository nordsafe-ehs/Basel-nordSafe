import { Grid2 as Grid } from "@mui/material";
import YouTube from "react-youtube";

const videos = ["JGwWNGJdvx8", "31crA53Dgu0"];

const Videos = () => {
  return (
    <>
      <Grid container spacing={2}>
        {videos.map((id, i) => (
          <Grid
            size={6}
            sx={{
              iframe: {
                width: 1,
                height: "unset",
                aspectRatio: "16/9",
              },
            }}
            key={i}
          >
            <YouTube videoId={id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Videos;
