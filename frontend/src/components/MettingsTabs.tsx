// import { useState } from "react";
// import { Box, Tabs, Tab, Typography } from "@mui/material";
// import SessionDetailsForm from "./SeasionDetails";
// import MettingAgenda from "./MettingAgenda";
// import AttendanceTable from "./RoleHoldersMetting";
// import AgendaTable from "./AgendaTableMetting";
// import AttachmentsTable from "./AttecmentMetting";

// const TabsSection = ({ meetingId }: { meetingId?: number }) => {
//   const [tabIndex, setTabIndex] = useState(0);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Tabs
//         value={tabIndex}
//         onChange={(e, newValue) => setTabIndex(newValue)}
//         textColor="primary"
//         indicatorColor="primary"
//         sx={{ mb: 2 }}
//       >
//         <Tab label="Session Details" />
//         <Tab label="Agenda" />
//         <Tab label="Role Holders" />
//         <Tab label="Action Log" />
//         <Tab label="Attachments" />
//       </Tabs>

//       {/* ✅ التبويبات تبقى موجودة دائماً */}
//       <div hidden={tabIndex !== 0}>
//         <SessionDetailsForm meetingId={meetingId} />
//       </div>
//       <div hidden={tabIndex !== 1}>
//         {meetingId ? (
//           <MettingAgenda meetingId={meetingId} />
//         ) : (
//           <Typography color="error">Create a meeting first</Typography>
//         )}
//       </div>
//       <div hidden={tabIndex !== 2}>
//         {meetingId ? (
//           <AttendanceTable meetingId={meetingId} />
//         ) : (
//           <Typography color="error">Create a meeting first</Typography>
//         )}
//       </div>
//       <div hidden={tabIndex !== 3}>
//         {meetingId ? (
//           <AgendaTable meetingId={meetingId} />
//         ) : (
//           <Typography color="error">Create a meeting first</Typography>
//         )}
//       </div>
//       <div hidden={tabIndex !== 4}>
//         {meetingId ? (
//           <AttachmentsTable meetingId={meetingId} />
//         ) : (
//           <Typography color="error">Create a meeting first</Typography>
//         )}
//       </div>
//     </Box>
//   );
// };

// export default TabsSection;



import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

import SessionDetailsForm from "./SeasionDetails";
import MettingAgenda from "./MettingAgenda";
import AttendanceTable from "./RoleHoldersMetting";
import AgendaTable from "./AgendaTableMetting";
import AttachmentsTable from "./AttecmentMetting";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const TabsSection = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [meetingId, setMeetingId] = useState<number | null>(null);

  const tabs = [
    { label: "Session Details" },
    { label: "Discussion Items" },
    { label: "Role Holders" },
    { label: "Action Log" },
    { label: "Attachments" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        centered
        sx={{ mb: 2 }}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              borderRadius: "30px",
              background: tabIndex === index ? "#F0FFF8" : "#fff",
              color: tabIndex === index ? "#0CB283" : "#172E4E",
              border: "0.1px solid #E5EFFF",
              px: 3,
              py: 1,
              mx: 1,
              minWidth: 0,
              fontWeight: "bold",
            }}
          />
        ))}
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <SessionDetailsForm
          meetingId={meetingId ?? undefined}
          onMeetingCreated={(id: number) => setMeetingId(id)}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {meetingId ? (
          <MettingAgenda meetingId={meetingId} />
        ) : (
          <Typography color="error">Create a meeting first</Typography>
        )}
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        {meetingId ? (
          <AttendanceTable meetingId={meetingId} />
        ) : (
          <Typography color="error">Create a meeting first</Typography>
        )}
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        {meetingId ? (
          <AgendaTable meetingId={meetingId} />
        ) : (
          <Typography color="error">Create a meeting first</Typography>
        )}
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        {meetingId ? (
          <AttachmentsTable meetingId={meetingId} />
        ) : (
          <Typography color="error">Create a meeting first</Typography>
        )}
      </TabPanel>
    </Box>
  );
};

export default TabsSection;
