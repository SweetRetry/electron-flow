import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export class DayjsHelper {
  static getRelativeTime = (time: number) => {
    return dayjs(time).fromNow();
  };
}
