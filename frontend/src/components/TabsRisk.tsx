import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import UploadIcon from "@mui/icons-material/Upload";
import Soon from "../pages/Soon";
import RiskAssessment from "./RiskAssessment";
import RiskLevel from "./RiskLevel";
import DrawIcon from "@mui/icons-material/Draw";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import SignatureField from "./SignatureField";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Participants from "./PartisipantRisk";
import SignPage from "./SignPage";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const BasicTabsRiskAssesment = () => {
  const [value, setValue] = useState(0);
  const [documentId, setDocumentId] = useState(null);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "Info", icon: <InfoIcon /> },
    { label: "Participants", icon: <PeopleAltIcon /> },
    { label: "Abbreviations", icon: <UploadIcon /> },
    { label: "Sheet", icon: <FormatListBulletedSharpIcon /> },
    { label: "Sign-offs", icon: <DrawIcon /> },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{ mb: 2 }}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            sx={{
              borderRadius: "50px",

              background: value === index ? "#F0FFF8" : "#fff",
              color: value === index ? "#F0FFF8" : "#fff",
              border: "0.1px solid #E5EFFF",
              px: 2,
              py: 1,
              mx: 1,
              minWidth: 0,
            }}
            icon={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  color: "#172E4E",
                }}
              >
                {tab.label}
                <Typography
                  sx={{ color: value === index ? "#0CB283 " : "#172E4E" }}
                  variant="body2"
                >
                  {tab.icon}
                </Typography>
              </Box>
            }
          />
        ))}
      </Tabs>

      <TabPanel value={value} index={0}>
        <Soon onCreated={(id) => setDocumentId(id)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Participants documentId={documentId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RiskLevel />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RiskAssessment />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SignPage documentId={documentId} />
      </TabPanel>
    </Box>
  );
};

export default BasicTabsRiskAssesment;
