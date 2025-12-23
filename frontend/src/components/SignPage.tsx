import { Box, Grid, Typography } from "@mui/material";
import SignatureField from "./SignatureField";
import axios from "axios";
import { API_URL } from "../API_URL";
import { useEffect, useState } from "react";

const SignPage = ({documentId}) => {
  const [participants, setParticipants] = useState<any[]>([]);

 useEffect(() => {
   if (documentId) {
     axios
       .get(`${API_URL}/participants/byDoc/${documentId}`)
       .then((res) => setParticipants(res.data));
   }
 }, [documentId]);


  const handleSignatureChange = async (
    participantId: string,
    dataUrl: string
  ) => {
    try {
      await axios.put(`${API_URL}/participants/${participantId}`, {
        signatureUrl: dataUrl,
      });
      setParticipants((prev) =>
        prev.map((p) =>
          p.id.toString() === participantId
            ? { ...p, signatureUrl: dataUrl }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 4, background: "#F0FFF8" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Sign-offs
      </Typography>

      {participants.map((p) => (
        <Grid item xs={6} key={p.id}>
          <Box mb={4}>
            <Typography fontWeight="bold" mb={1}>
              {p.position}: {p.name}
            </Typography>
            <SignatureField
              name={p.id.toString()}
              value={p.signatureUrl || ""}
              onChange={handleSignatureChange}
            />
          </Box>
        </Grid>
      ))}
    </Box>
  );
};

export default SignPage;
