"use client";

import { useState } from "react";
import { Toast } from "./Toasts/toast";
import { http } from "@/http/axios-response";
import { useRouter } from "next/navigation";

import secureLocalStorage from "react-secure-storage";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toast, setToast] = useState(false);

  const { push } = useRouter();

  async function verifyLogin(e: any) {
    e.preventDefault();

    if (!email) {
      setToast(true);
      return;
    }

    if (!password) {
      setToast(true);
      return;
    }

    setToast(false);

    try {
      const response = await http.post("/login", {
        email,
        password,
      });

      if (!response) {
        return;
      }

      const token = response.data.token;

      secureLocalStorage.setItem("item", token);

      push("/dashboard");
    } catch (err: any) {
      console.error(err?.response?.data);
      setToast(true);
    }
  }

  return (
    <div className="border-solid  border-2  justify-center h-screen flex flex-col items-center gap-6">
      <Toast
        setValidation={setToast}
        message="Email or password not found"
        validation={toast}
      />
      <h1>Login</h1>
      <form onSubmit={verifyLogin} autoComplete="off" method="POST">
        <div className="flex flex-col items-end">
          <label htmlFor="email">
            <span>email: </span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-current border-slate-500 outline-none rounded-lg px-2 w-48 mb-4"
              name="email"
              type="email"
              id="email"
            />
          </label>

          <label htmlFor="password">
            <span>senha: </span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-current border-slate-500 outline-none rounded-lg px-2 w-48"
              type="password"
              name="password"
              id="password"
            />
          </label>
        </div>

        <div className="flex justify-center mt-4">
          <button className="text-cyan-50 bg-sky-700 p-2 rounded-lg hover:bg-sky-600 duration-200">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
