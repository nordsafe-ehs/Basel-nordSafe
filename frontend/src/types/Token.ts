export interface Token {
  role: "user" | "admin" | "super-admin" | "visitor";
  id: number;
  fullname: string;
  email: string;
  companyId: number;
  subscriptionEndsAt: string;
  subscriptionType: ["free trial", "plan"];
}
