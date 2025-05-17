import { JSX } from "react";
import image from "./assets/1062-536x354.jpg";
import video from "./assets/e03hi7.mp4";
import { ThemeProvider } from "./context/theme-provider";
import { EditModeFlow } from "./core/modes/edit";
import { BaseSize, NodeSpace } from "./core/nodes/base";
import BaseLayout from "./layout/base-layout";

const nodes = [
  {
    id: "1",
    type: "text",
    data: { text: "Input Node" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "image",
    data: { src: image, title: "Image Node" },
    position: { x: 0 + BaseSize.minWidth + NodeSpace, y: 0 },
  },

  {
    id: "3",
    type: "video",
    data: { src: video, title: "Video Node" },
    position: { x: 0 + (BaseSize.minWidth + NodeSpace) * 2, y: 0 },
  },

  {
    id: "4",
    type: "powerpoint",
    data: {
      src: "https://office-common.oss-ap-southeast-1.aliyuncs.com/table-agent_data_analyse/20250430_140102_Litter Box Market  Deep Insight.pptx",
      title: "PPT Node",
    },
    position: { x: 0 + (BaseSize.minWidth + NodeSpace) * 3, y: 0 },
  },
];

const edges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
  },
  {
    id: "2-3",
    source: "2",
    target: "3",
  },
];
function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BaseLayout>
        <EditModeFlow initialNodes={nodes} initialEdges={edges} />
      </BaseLayout>
    </ThemeProvider>
  );
}

export default App;
