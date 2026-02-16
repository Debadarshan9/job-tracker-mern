import { StatusEnum } from "./enum.js";

export const OptionsList = [
  { value: StatusEnum.APPLIED, viewValue: "Applied" },
  { value: StatusEnum.INTERVIEW, viewValue: "Interview" },
  { value: StatusEnum.REJECTED, viewValue: "Rejected" },
];

export const classes = (...rest) =>
  rest
    .flatMap((param) => param)
    .filter(Boolean)
    .join(" ");
