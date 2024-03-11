import { ScrollShadow, Tooltip } from "@nextui-org/react";
import React, { useContext, useState, useRef, useEffect } from "react";
import MainContext from "../context/MainContext";
import rohit from "../assets/Rohits.jpg";
import { marked } from "marked";

const Chat = () => {
  const { hide, send, setPrompt, prompt, recent, disabled, chat, show } =
    useContext(MainContext);
  const [listening, setListening] = useState(false);
  const recognition = new window.webkitSpeechRecognition();
  const scrollTop = useRef(null);

  useEffect(() => {
    if (scrollTop.current) {
      scrollTop.current.scrollTo({
        top: scrollTop.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [prompt]);

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (e) => {
    let initial = "";
    let final = "";

    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = e.results[i][0].transcript;
      if (e.results[i].isFinal) {
        final += transcript + " ";
      } else {
        initial += transcript;
      }
    }
    setPrompt(final);
  };

  const toggleListening = () => {
    if (!listening) {
      recognition.start();
      setListening(true);
    } else {
      recognition.stop();
      setListening(false);
    }
  };

  return (
    <div className="bg-[#131314] h-full p-6 flex flex-col items-center w-full">
      <div className="flex w-full justify-between">
        <p className="text-[1.5em] bg-gradient-to-r from-blue-600 to-red-400 bg-clip-text text-transparent">
          Bard
        </p>
        <img
          className="rounded-full w-12 border-[2.5px] border-r-blue-600 border-t-red-600 border-l-yellow-400 border-b-green-600"
          src={rohit}
          alt="user"
        />
      </div>
      {!hide && !show && (
        <ScrollShadow className="h-[70vh] mb-6 grid lg:w-[58em] max-w-[52em]">
          <div>
            <span className="md:text-[3.5em] text-[2em] font-semibold bg-gradient-to-r from-blue-600 to-red-400 bg-clip-text text-transparent">
              Hello, Rohit
            </span>
            <br />
            <span className="md:text-[3.5em] text-[2em] font-semibold text-[#444746]">
              How can I help you today?
            </span>
          </div>
          <div className="flex gap-3 text-white font-medium text-[1em] overflow-x-auto">
            <div
              onClick={async () => {
                setPrompt(
                  "Briefly summarize this concept: urban planning. Include a brief description of the term and list key aspects of the concept"
                );
              }}
              style={{ width: "200px", minWidth: "160px", height: "200px" }}
              className="bg-[#1e1f20] hover:bg-[#262627] rounded-2xl p-4 cursor-pointer relative"
            >
              <p>Briefly summarize this concept: urban planning</p>
              <i
                className="fa fa-lightbulb-o absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
                aria-hidden="true"
              ></i>
            </div>
            <div
              onClick={() => {
                setPrompt(
                  "Find some youtube video to help me learn web development"
                );
              }}
              style={{ width: "200px", minWidth: "160px", height: "200px" }}
              className="bg-[#1e1f20] hover:bg-[#262627] rounded-2xl p-4 cursor-pointer relative"
            >
              <p>Help me find YouTube videos</p>
              <i
                className="fa fa-youtube-play absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
                aria-hidden="true"
              ></i>
            </div>
            <div
              onClick={() => {
                setPrompt(
                  "Help me write a thank you note to my colleague for going above and beyond"
                );
              }}
              style={{ width: "200px", minWidth: "160px", height: "200px" }}
              className="bg-[#1e1f20] hover:bg-[#262627] rounded-2xl p-4 cursor-pointer relative"
            >
              <p>Write a thank you note to my colleague</p>
              <i
                className="fa fa-pencil absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
                aria-hidden="true"
              ></i>
            </div>
            <div
              onClick={() => {
                setPrompt(
                  "Write a HTML code to understand the basic structure of the language"
                );
              }}
              style={{ width: "200px", minWidth: "160px", height: "200px" }}
              className="bg-[#1e1f20] hover:bg-[#262627] rounded-2xl p-4 cursor-pointer relative"
            >
              <p>Write me a basic HTML code</p>
              <i
                className="fa fa-code absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </ScrollShadow>
      )}
      {hide && !show && (
        <ScrollShadow
          ref={scrollTop}
          className="h-[70vh] lg:w-[58em] max-w-[52em] mb-6"
        >
          {recent.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 mt-4 text-lg text-left leading-[2em]"
            >
              <div className="flex gap-4 items-start">
                <img
                  className="rounded-full object-contain w-10"
                  src={rohit}
                  alt="user"
                />
                <p>{item.prompt}</p>
              </div>
              <div className="flex gap-6 items-start">
                <img
                  className={`${item.loading && "animate-bounce mt-2"} w-10`}
                  src="./Icon.ico"
                  alt="icon"
                />
                {item.loading ? (
                  <div className="w-full flex flex-col gap-[1em]">
                    <hr className="h-[1em] w-full border-none rounded-md animate-gemini bg-gradient-to-r from-blue-900 from-15% via-red-400 to-blue-900" />
                    <hr className="h-[1em] w-3/4 border-none rounded-md animate-gemini bg-gradient-to-r from-blue-900 from-10% via-red-400 to-blue-900" />
                    <hr className="h-[1em] w-1/2 border-none rounded-md animate-gemini bg-gradient-to-r from-blue-900 via-red-400 to-blue-900" />
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: marked.parse(item.res) }}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </ScrollShadow>
      )}
      {show && (
        <ScrollShadow
          ref={scrollTop}
          className="h-[70vh] lg:w-[58em] max-w-[52em] mb-6"
        >
          <div className="flex flex-col gap-4 mt-4 text-lg text-left leading-[2em]">
            <div className="flex gap-4 items-start">
              <img
                className="rounded-full object-contain w-10"
                src={rohit}
                alt="user"
              />
              <p>{chat.prompt}</p>
            </div>
            <div className="flex gap-6 items-start">
              <img src="./Icon.ico" alt="icon" />
              <div
                dangerouslySetInnerHTML={{ __html: marked.parse(chat.res) }}
              ></div>
            </div>
          </div>
        </ScrollShadow>
      )}
      <div className="text-center lg:w-[58em] max-w-[52em] mt-auto">
        <div
          className="flex rounded-full bg-[#1e1f20] md:p-4 p-2 relative cursor-text"
          onClick={() => {
            document.getElementById("textarea").focus();
          }}
        >
          <textarea
            id="textarea"
            className="bg-transparent outline-none resize-none absolute md:top-6 top-4 h-6"
            placeholder="Enter a prompt here"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <div className="flex items-center ml-auto">
            <Tooltip content="Upload Image">
              <div className="flex items-center cursor-pointer hover:bg-[#131314] py-2 px-3 rounded-full">
                <label htmlFor="img">
                  <i
                    className="fa fa-picture-o cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </label>
                <input
                  className="opacity-0 absolute -z-10 w-4"
                  type="file"
                  id="img"
                  name="img"
                />
              </div>
            </Tooltip>
            <Tooltip content={listening ? "Stop Microphone" : "Use Microphone"}>
              <button onClick={toggleListening}>
                <i
                  className={`fa fa-microphone p-3 rounded-full ${
                    !listening && " hover:bg-[#131314]"
                  } cursor-pointer ${listening && "bg-blue-900"}`}
                ></i>
              </button>
            </Tooltip>
            {prompt && (
              <Tooltip content="Submit">
                <button
                  type="submit"
                  disabled={disabled}
                  onClick={() => {
                    send();
                    setPrompt("");
                  }}
                >
                  <i
                    className={`fa fa-paper-plane-o p-3 rounded-full hover:bg-[#131314] cursor-pointer ${
                      disabled && "opacity-30"
                    }`}
                    aria-hidden="true"
                  ></i>
                </button>
              </Tooltip>
            )}
          </div>
        </div>
        <p className="mt-2 text-sm">
          Bard may display inaccurate info, including about people, so
          double-check its responses.{" "}
          <a
            target="blank"
            className="underline"
            href="https://support.google.com/gemini/answer/13594961?visit_id=638455251086324999-4094199448&p=privacy_notice&rd=1#privacy_notice"
          >
            Your privacy & Bard Apps
          </a>
        </p>
      </div>
    </div>
  );
};

export default Chat;
