import { StatusEnum, ValidateEnum } from "../utils/enum.js";

export const validateJob = (mode) => (req, res, next) => {
  const { title, company, status } = req.body;

  // Title Validation
  if (mode === ValidateEnum.CREATE && !title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({ message: "Title should be a valid string" });
  }

  //  Company name
  if (mode === ValidateEnum.CREATE && !company?.name) {
    return res.status(400).json({ message: "Company name is required" });
  }
  if (company?.name !== undefined && typeof company?.name !== "string") {
    return res
      .status(400)
      .json({ message: "Company name should be a valid string" });
  }

  //   Status
  if (
    status !== undefined &&
    !Object.values(StatusEnum).includes(Number(status))
  ) {
    return res.status(400).json({ message: "Invalid status" });
  }

  next();
};
