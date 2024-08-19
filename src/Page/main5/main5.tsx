import axios from "axios";
import { useState } from "react";

const Main5 = () => {
  const [text, setText] = useState("");

  axios
    .post("/user/register", { name: "qtcyy", password: "123" })
    .then((response) => {
      console.log(response.data);
      setText(response.data.info);
    });

  return (
    <>
      <div className="py-4 px-6 text-2xl font-serif">
        <p>{text}</p>
      </div>
    </>
  );
};

export { Main5 };
