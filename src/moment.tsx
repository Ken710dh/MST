import moment from "moment";

 export const getFormattedDate = (): string => moment().format("YYYY-MM-DD HH:mm:ss");
