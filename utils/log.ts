type LogState = "success" | "info" | "error" | "warning" | "default";

export const log = (message: string, state: LogState = "default") => {
  switch (state) {
    case "success":
      console.info("%c" + message, "color: MediumSeaGreen");
      break;
    case "info":
      console.info("%c" + message, "color: DodgerBlue");
      break;
    case "error":
      console.error("%c" + message);
      break;
    case "warning":
      console.warn("%c" + message);
      break;
    default:
      console.log("%c" + message);
  }
};
