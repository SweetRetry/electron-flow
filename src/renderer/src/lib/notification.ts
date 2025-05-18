import { toast } from "sonner";

export const sendNotification = (title: string, body: string) => {
  if (document.visibilityState === "visible") {
    toast(title, { description: body });
  } else {
    window.api.sendNotification(title, body);
  }
};
