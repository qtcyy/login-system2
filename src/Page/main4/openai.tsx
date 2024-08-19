import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.css";
import remarkGfm from "remark-gfm";

const API = process.env.PUBLIC_OPENAI_API_KEY;

const Openai = () => {
  const [tokens, setTokens] = useState(500);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "user", content: "" }]);
  const [response, setResponse] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    try {
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: updatedMessages,
          max_tokens: tokens,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API}`,
          },
        }
      );
      console.log("post success");
      setMessages([...updatedMessages, result.data.choices[0].message]);
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setResponse("Error: Unable to fetch data from OpenAI.");
    }
    setInput("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const number = value === "" ? "" : Number(value);

    setTokens(number);
  };

  return (
    <>
      <div>
        tokens:
        <input
          className=" pl-2 py-4 px-6 border border-blue-500 hover:border-blue-700 rounded-md"
          type="number"
          value={tokens}
          onChange={(e) => handleChange(e)}
        />
        <input
          className=" pl-2 py-4 px-6 border border-blue-500 hover:border-blue-700 rounded-md"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          /*
          onKeyDown={(e) => {
            e.key === "Enter" && handleSubmit();
          }}
            */
          placeholder="Ask anything..."
        />
        <button
          className="border-gray-400 bg-gray-300 hover:bg-gray-500 rounded-xl px-2 py-4 mx-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="border-gray-400 bg-gray-300 hover:bg-gray-500 rounded-xl px-2 py-4 mx-2"
          onClick={() => setMessages([])}
        >
          Clear
        </button>
      </div>
      <div>
        <h3 className="font-sans text-lg">Response from openai:</h3>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>
              <Markdown
                key={i}
                className="font-serif text-lg"
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <code
                        className={className}
                        {...props}
                        children={String(children).replace(/\n$/, "")}
                      />
                    ) : (
                      <code
                        className={className}
                        {...props}
                        children={children}
                      />
                    );
                  },
                }}
              >
                {message.role + ":   " + message.content}
              </Markdown>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { Openai };
