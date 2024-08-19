import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const Main1 = () => {
  const [check, setCheck] = useState(false);
  const [text, setText] = useState("default");
  const [form, setForm] = useState({ admin: "", password: "" });

  const Login = () => {
    axios
      .post("/api/login", form)
      .then((response) => {
        console.log(response.data);
        setText(response.data.id + " login success");
        setCheck(response.data.check);
      })
      .catch((error) => {
        console.log(error);
        setText("login failed");
      });
  };

  return (
    <>
      <div className=" columns-3  text-white py-4 px-4 font-mono">
        <h1 className="w-full bg-red-500">HI,WELCOME</h1>
        <h2 className="w-full bg-red-500 ">Happy</h2>
      </div>
      <div className="columns-3 py-2 px-4 text-lg">
        <p>Admin:</p>
        <input
          className=" border border-blue-500 hover:border-blue-800 rounded-lg pl-2"
          value={form.admin}
          onKeyDown={(e) => e.key === "Enter" && Login()}
          onChange={(e) =>
            setForm((oldForm) => {
              return { ...oldForm, admin: e.target.value };
            })
          }
        />
        <br />
        <p>Password:</p>
        <input
          type="password"
          className=" border border-blue-500 hover:border-blue-800 rounded-lg pl-2"
          value={form.password}
          onKeyDown={(e) => e.key === "Enter" && Login()}
          onChange={(e) => {
            setForm((oldForm) => {
              return { ...oldForm, password: e.target.value };
            });
          }}
        />
      </div>
      <br />
      <div className=" columns-3 py-2 px-4 text-xl">
        <button
          className=" border border-gray-500 bg-gray-500 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-2xl"
          onClick={() => Login()}
        >
          Submit
        </button>
      </div>
      <div className="py-2 px-8 font-sans text-xl">
        {check ? <div>{text}</div> : <div>login failed</div>}
      </div>
    </>
  );
};

export { Main1 };
