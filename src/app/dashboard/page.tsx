"use client";

import { http } from "@/http/axios-response";
import { log } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Dashboard() {
  const [user, setUser] = useState("");

  const { push } = useRouter();

  async function verifyLogin() {
    try {
      let token = secureLocalStorage.getItem("item");

      const login = await http.get("/profile", {
        headers: { authorization: `Bearer ${token}` },
      });

      setUser(login.data.loggedUser.name);

      if (!login.data.loggedUser.id) {
        return;
      }
    } catch (err: any) {
      console.log(err);
      return push("/");
    }
  }

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center border-solid border-2 border-red-700">
      <p>Wellcome {user}!</p>
    </div>
  );
}
