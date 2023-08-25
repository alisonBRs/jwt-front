"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const isValid = true;
  const router = useRouter();

  if (!isValid) {
    return router.replace("/");
  }
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}
