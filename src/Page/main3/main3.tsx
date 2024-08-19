import axios from "axios";
import { useState } from "react";

const Main3 = () => {
  const [users, setUsers] = useState([{ id: 0, username: "", password: "" }]);
  const [check, setCheck] = useState(false);

  const getInfo = () => {
    axios
      .get("/api/get-info")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Get info error:" + error));
  };

  return (
    <>
      <div className="py-4 px-6">
        <button
          className=" font-mono text-xl border border-gray-500 bg-gray-400 hover:bg-gray-700
      hover:text-red-500 rounded-lg focus:outline-none focus:shadow-outline mx-2
      "
          onClick={() => getInfo()}
        >
          Get-Info
        </button>
        <button
          className=" font-mono text-xl border border-gray-500 bg-gray-400 hover:bg-gray-700
      hover:text-red-500 rounded-lg focus:outline-none focus:shadow-outline mx-2
      "
          onClick={() => setCheck((oldCheck) => !oldCheck)}
        >
          Display
        </button>
      </div>
      <div className=" font-mono text-xl hover:text-yellow-500 px-8">
        {check && (
          <ul>
            {users.map((user, i) => (
              <li key={i}>
                id={user.id}
                {"  "}
                Admin={user.username}
                {"  "}
                Password={user.password}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export { Main3 };
