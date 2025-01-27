declare namespace Express {
  export interface Request {
    user: { id: number; email: string; role: "CUSTOMER" | "BUSINESS" };
  }
}
