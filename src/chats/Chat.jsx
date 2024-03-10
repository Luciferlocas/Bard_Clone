import { ScrollShadow, Tooltip } from "@nextui-org/react";
import React, { useContext, useState, useRef, useEffect } from "react";
import MainContext from "../context/MainContext";
import rohit from "../assets/Rohits.jpg";
import { marked } from "marked";

const Chat = () => {
  const { hide, res, send, setPrompt, prompt, recent, disabled } =
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
    <div className="bg-[#131314] w-full p-6 flex flex-col items-center">
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
      {!hide ? (
        <ScrollShadow
          hideScrollBar
          className="h-[36em] grid place-content-center gap-20 max-w-[58em]"
        >
          <div>
            <span className="text-[4em] font-semibold bg-gradient-to-r from-blue-600 to-red-400 bg-clip-text text-transparent">
              Hello, Rohit
            </span>
            <br />
            <span className="text-[4em] font-semibold text-[#444746]">
              How can I help you today?
            </span>
          </div>
          <ScrollShadow className="flex gap-3 text-white font-medium text-[1em]">
            <div className="bg-[#1e1f20] hover:bg-[#262627] aspect-square rounded-2xl w-[14em] p-4 cursor-pointer relative">
              <p>Help me craft an OOO message based on a few details</p>
              <i
                className="fa fa-pencil absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
                aria-hidden="true"
              ></i>
            </div>
            <div className="bg-[#1e1f20] hover:bg-[#262627] aspect-square rounded-2xl w-[14em] p-4 cursor-pointer relative">
              <p>Help me find YouTube videos to care for a specific plant</p>
              <i
                className="fa fa-youtube-play absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
                aria-hidden="true"
              ></i>
            </div>
            <div className="bg-[#1e1f20] hover:bg-[#262627] aspect-square rounded-2xl w-[14em] p-4 cursor-pointer relative">
              <p>
                Outline an organized & logical sales pitch for a new product
              </p>
              <i
                className="fa fa-lightbulb-o absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
                aria-hidden="true"
              ></i>
            </div>
            <div className="bg-[#1e1f20] hover:bg-[#262627] aspect-square rounded-2xl w-[14em] p-4 cursor-pointer relative">
              <p>Write me a basic HTML code</p>
              <i
                className="fa fa-code absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
                aria-hidden="true"
              ></i>
            </div>
          </ScrollShadow>
        </ScrollShadow>
      ) : (
        <ScrollShadow
          ref={scrollTop}
          hideScrollBar
          className="h-[36em] w-[58em]"
        >
          {recent.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 mt-4 pb-10 text-lg text-left leading-[2em]"
            >
              <div className="flex gap-4 items-start">
                <img
                  className="rounded-full object-contain w-10"
                  src={rohit}
                  alt="user"
                />
                <p>{item.prompt}</p>
              </div>
              <div className="flex gap-4 items-start">
                <img
                  className={`${item.loading && "animate-bounce mt-2"} w-10`}
                  src="./Icon.ico"
                  alt="icon"
                />
                {item.loading ? (
                  <div className="w-full flex flex-col gap-[1em]">
                    <hr className="h-[1em] w-[48em] border-none rounded-md animate-gemini bg-gradient-to-r from-blue-900 from-15% via-red-400 to-blue-900" />
                    <hr className="h-[1em] w-[45em] border-none rounded-md animate-gemini bg-gradient-to-r from-blue-900 from-10% via-red-400 to-blue-900" />
                    <hr className="h-[1em] w-[40em] border-none rounded-md animate-gemini bg-gradient-to-r from-blue-900 via-red-400 to-blue-900" />
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: marked.parse(res[i]) }}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </ScrollShadow>
      )}
      <div className="mt-auto text-center">
        <div className="flex rounded-full bg-[#1e1f20] p-4 relative lg:w-[58em] max-w-[58em]">
          <textarea
            className="w-[49em] bg-transparent outline-none resize-none absolute top-6 h-6"
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
                  className="opacity-0 absolute -z-10"
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
                    className={`fa fa-paper-plane-o p-3 rounded-full hover:bg-[#131314] cursor-pointer ${disabled && "opacity-30"}`}
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
