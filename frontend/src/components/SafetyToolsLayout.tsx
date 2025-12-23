// import { Box } from "@mui/material";
// import Links from "./Links";
// import Checklists from "../pages/Checklists";

// const SafetyToolsLayout = () => {
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
//       <Checklists/>
//       <Box
//         sx={{
//           position: "sticky", // يخلي القسم ثابت فوق
//           top: 0,
//           zIndex: 10,
//           bgcolor: "#fff",
//           borderBottom: "1px solid #ddd",
//         }}
//       >
//         <Links />
//       </Box>

//       {/* القسم الثاني تحت */}
//       <Box sx={{ flex: 1, overflow: "auto" }}>
//         <Checklists />
//       </Box>
//     </Box>
//   );
// };

// export default SafetyToolsLayout;


import { Box } from "@mui/material";
import Links from "./Links";
import Checklists from "../pages/Checklists";

const SafetyToolsLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* اللينكات مثبتة في الأعلى */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "#fff",
          borderBottom: "1px solid #ddd",
          p: 1,
        }}
      >
        <Links />
      </Box>

      {/* التشيك ليست تحتها بشكل أفقي مع Scroll */}
      <Box
        sx={{
          flex: 1,
          overflowX: "auto", // Scroll أفقي
          overflowY: "hidden", // منع Scroll عمودي
          display: "flex",
          flexDirection: "row",
          p: 2,
        }}
      >
        <Checklists />
      </Box>
    </Box>
  );
};

export default SafetyToolsLayout;



