import { Fragment, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Home from "./components/Home";
import Links from "./components/Links";
import List from "./components/List";
import View from "./components/View";
import { links } from "./data/Sidebar";
import { useToken } from "./hooks/useToken";
import PanelLayout from "./layouts/PanelLayout";
import InstallPWA from "./pages/InstallPWA";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { LinkType } from "./types/Sidebar";
import { Token } from "./types/Token";

const mainRoute = "/";

const App = () => {
  const { token, decodedToken } = useToken();

  return (
    <Routes>
      <Route
        path="/auth/login"
        element={token ? <Navigate to={mainRoute} /> : <Login />}
      />
      <Route
        path="/auth/register"
        element={token ? <Navigate to={mainRoute} /> : <Register />}
      />
      <Route path="/install" element={<InstallPWA />} />
      <Route path="*" element={<Navigate to="/" />} />
      {renderRoutes(links, token, decodedToken)}
    </Routes>
  );
};

const renderRoutes = (
  routes: LinkType[],
  token: string | null,
  decodedToken: Token
): ReactNode => {
  return routes.map(
    (
      { href, type, links, component, permissions, hasNoLayout, ...route },
      i
    ) => {
      if (!type) return null;
      if (permissions && !permissions.includes(decodedToken.role)) return null;

      const content =
        type == "home" ? (
          <Home />
        ) : type == "form" || type == "edit" ? (
          <Form />
        ) : type == "list" ? (
          <List />
        ) : type == "links" ? (
          <Links />
        ) : type == "view" ? (
          <View />
        ) : (
          component
        );

      return (
        <Fragment  key={i}>
          <Route
            key={i}
            path={href}
            element={
              token ? (
                hasNoLayout ? (
                  content
                ) : (
                  <PanelLayout>
                    {route.layout ? (
                      <route.layout>{content}</route.layout>
                    ) : (
                      content
                    )}
                  </PanelLayout>
                )
              ) : (
                <Navigate to={"/auth/login"} />
              )
            }
          ></Route>
          {links && renderRoutes(links, token, decodedToken)}
        </Fragment>
      );
    }
  );
};
// const App = () => {
//   <Toaster position="top-center"/>;
//   return (
//     <Routes>
//       <Route path="/auth/login" element={<Login />} />
//       <Route path="/auth/register" element={<Register />} />
//       <Route path="/install" element={<InstallPWA />} />
//       <Route path="/createProject" element={<CreateProject />} />
//       {renderRoutes(links)}
//     </Routes>
//   );
// };

// const renderRoutes = (routes: LinkType[]): ReactNode => {
//   return routes.map(
//     ({ href, type, links, component, hasNoLayout, ...route }, i) => {
//       if (!type) return null;

//       const content =
//         type === "home" ? (
//           <Home />
//         ) : type === "form" || type === "edit" ? (
//           <Form />
//         ) : type === "list" ? (
//           <List />
//         ) : type === "links" ? (
//           <Links />
//         ) : type === "view" ? (
//           <View />
//         ) : (
//           component
//         );

//       return (
//         <Fragment key={i}>
//           <Route
//             path={href}
//             element={
//               hasNoLayout ? (
//                 content
//               ) : (
//                 <PanelLayout>
//                   {route.layout ? (
//                     <route.layout>{content}</route.layout>
//                   ) : (
//                     content
//                   )}
//                 </PanelLayout>
//               )
//             }
//           />
//           {links && renderRoutes(links)}
//         </Fragment>
//       );
//     }
//   );
// };
export default App;
