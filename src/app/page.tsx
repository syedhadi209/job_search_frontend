"use client";

import { useUserContext } from "@/context/userContext";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Jobs {
  _id: string;
  job_name: string;
}

export default function Home() {
  const router = useRouter();
  const { user } = useUserContext();

  const [jobs, setJobs] = useState<Jobs[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getJobs = (query: string) => {
    setIsLoading(true);
    axios
      .post("http://localhost:8000/api/user/jobs-listings", { query })
      .then((res) => {
        setJobs(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!user) router.push("/login");

    getJobs("");
  }, []);

  if (user)
    return (
      <Box>
        <Container
          sx={{
            padding: "30px 0",
          }}
        >
          <Box
            maxWidth='sm'
            sx={{
              margin: "auto",
            }}
          >
            <TextField
              id='outlined-basic'
              label='Search Jobs'
              variant='outlined'
              fullWidth
              onChange={(e) => getJobs(e.target.value)}
            />
            <Typography
              sx={{ margin: "10px 0", fontSize: "20px", fontWeight: "bold" }}
            >
              {jobs && jobs?.length > 0 ? "Searched Jobs" : "No Jobs Found"}
            </Typography>
            <Box>
              {isLoading ? (
                <CircularProgress />
              ) : (
                jobs?.map((job) => {
                  return (
                    <Paper
                      key={job._id}
                      sx={{
                        padding: "20px",
                        margin: "10px 0",
                        border: "1px solid gray",
                      }}
                    >
                      {job?.job_name}
                    </Paper>
                  );
                })
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    );
}
