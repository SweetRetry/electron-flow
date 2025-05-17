import { JSX } from "react";
import Layout from "./layout/base";
import { ThemeProvider } from "./context/theme-provider";
import { CanvasPage } from "@flow/core/pages/[canvasId]/page";

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Layout>
        <section className="w-full h-full">
          <CanvasPage

            nodes={[
              {
                id: "1",
                type: "text",
                data: { text: "Input Node" },
                position: { x: 0, y: 0 },
              },

            ]} edges={[]} />
        </section>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
