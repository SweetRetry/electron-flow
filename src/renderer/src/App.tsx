import { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import { router } from "./router";

function App(): JSX.Element {

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
