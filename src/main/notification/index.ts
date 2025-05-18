import { Notification } from "electron";

// 只负责发送系统通知
export const sendSystemNotification = (title: string, body: string) => {
    const notification = new Notification({ title, body });
    notification.show();
};

