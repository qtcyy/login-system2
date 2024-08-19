import "./App.css";
import { InputProvider } from "./Context/InputContext";
import { Input } from "./Context/InputConponent";
import { useState } from "react";
import axios from "axios";

const Main2 = () => {
  const [user, setUser] = useState({ admin: "", password: "" });
  const [text, setText] = useState("");

  const Register = () => {
    axios
      .post("/api/register", user)
      .then((response) => {
        console.log(response);
        setText(
          "User " +
            user.admin +
            " for id: " +
            response.data.id.toString() +
            " is successfully registered "
        );
      })
      .catch((error) => {
        console.log(error);
        setText("username repeat");
      });
  };

  return (
    <>
      <div className=" py-4 px-6 font-serif text-yellow-500 text-2xl">
        Register
      </div>
      <div>
        <InputProvider className="border border-blue-500 hover:border-blue-700 rounded-lg pl-2">
          <div className="px-12">
            <p className="font-mono text-lg">Admin:</p>
            <Input
              type="text"
              value={user.admin}
              onChange={(e) =>
                setUser((oldUser) => {
                  return { ...oldUser, admin: e.target.value };
                })
              }
              onKeyDown={(e) => {
                e.key === "Enter" && Register();
              }}
            />
          </div>
          <div className="px-12">
            <p className="font-mono text-lg">Password:</p>
            <Input
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser((oldUser) => {
                  return { ...oldUser, password: e.target.value };
                })
              }
              onKeyDown={(e) => {
                e.key === "Enter" && Register();
              }}
            />
          </div>
        </InputProvider>
      </div>
      <br />
      <br />
      <div className="px-12">
        <button
          className="bg-blue-500 hover:bg-blue-700 hover:text-red-600 px-4 py-2 font-semibold text-xl rounded-lg"
          onClick={() => Register()}
        >
          Register
        </button>
      </div>
      <div className="px-12 py-4 text-2xl font-serif text-red-600">
        <p>{text}</p>
      </div>
    </>
  );
};

export { Main2 };
