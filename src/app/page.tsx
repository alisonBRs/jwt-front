"use client";

import axios from "axios";
import { useState } from "react";
import { Toast } from "./Toasts/toast";

import bcrypt from "bcrypt";
import { http } from "@/http/axios-response";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [user, setUser] = useState(Object);
  const [userId, setUserId] = useState(Object);

  const [profile, setProfile] = useState(Array<profileType>);
  const [userPass, setUserPass] = useState(Object);

  const [alert, setAlert] = useState(false);

  interface profileType {
    id: number;
  }

  async function verifyLogin(e: any) {
    e.preventDefault();

    if (!email) {
      setAlert(true);
      return;
    }

    if (!password) {
      setAlert(true);
      return;
    }

    setAlert(false);

    try {
      const responseLogin = await http.post("/login", {
        email,
        password,
      });

      setToken(responseLogin.data.token);
      setUser(responseLogin.data.User);
      // setUserId(responseLogin.data.User.id);
    } catch (err: any) {
      console.error(err.response.data);
    }

    console.log(token);
  }

  function toast() {
    // const verifyPass = bcrypt.compare(password, )
    return false;
  }

  return (
    <div className="border-solid  border-2  justify-center h-screen flex flex-col items-center gap-6">
      <Toast validation={alert} />
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
