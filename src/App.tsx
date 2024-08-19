import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const router = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [serverTime, setServerTime] = useState(new Date());

  useEffect(() => {
    const fetchServerTime = () => {
      axios
        .get("/api/current-time")
        .then((response) => {
          setServerTime(new Date(response.data.currentTime));
          setCurrentTime(new Date(response.data.currentTime));
        })
        .catch((error) => console.log("Fetching time error:" + error));
    };

    fetchServerTime();

    const fetchInterval = setInterval(fetchServerTime, 5000);
    const timeInterval = setInterval(() => {
      setCurrentTime((oldTime) => new Date(oldTime.getTime() + 1000));
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const moveTo = (path: string) => {
    router(path);
  };

  return (
    <>
      <div className="font-serif py-2 px-6">
        <p className="text-3xl">Rsbuild with React</p>
        <p className="text-xl">Start building amazing things with Rsbuild.</p>
        <p className="text-xl font-mono hover:text-green-500">
          {currentTime.toLocaleString()}
        </p>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline mx-1"
        onClick={() => moveTo("/")}
      >
        App
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline mx-1"
        onClick={() => moveTo("/main1")}
      >
        Login
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline mx-1"
        onClick={() => moveTo("/main2")}
      >
        Register
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline mx-1"
        onClick={() => moveTo("/main3")}
      >
        Show
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline mx-1"
        onClick={() => moveTo("/main4")}
      >
        OpenAI
      </button>
      <Outlet />
    </>
  );
};

export default App;
