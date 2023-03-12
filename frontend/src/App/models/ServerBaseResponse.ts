export type ServerBaseResponse<T extends Record<string, any>> = {
  status: "success" | "error",
  message?: string,
} & Partial<T>;
