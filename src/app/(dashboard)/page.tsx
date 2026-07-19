import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  redirect("/receptionist/patients");
  return <div></div>;
}
