export interface FormType {
  [key: string]: string | FileList | boolean | number | { value: string; id: string };
}


// export const fetchWithProjectAlert = async (
//   url: string,
//   options: RequestInit,
//   activeProject: { id?: string },
//   showAlert: (msg: string, type?: "error" | "success") => void
// ) => {
//   if (!activeProject?.id) {
//     showAlert("No active project selected", "error");
//     return null;
//   }

//   try {
//     const res = await fetch(url, options);
//     return res;
//   } catch (error) {
//     showAlert("API request failed", "error");
//     console.error(error);
//     return null;
//   }
// };
