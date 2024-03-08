import { Input, ScrollShadow, Tooltip } from "@nextui-org/react";
import React from "react";

const Chat = () => {
  return (
    <div className="bg-[#131314] flex-1 p-6 flex flex-col items-center">
      <div className="flex w-full justify-between">
        <p className="text-[1.5em] bg-gradient-to-r from-blue-600 to-red-400 bg-clip-text text-transparent">
          Bard
        </p>
        <img src="/Icon.ico" alt="" />
      </div>
      <ScrollShadow
        hideScrollBar
        className="h-[36em] grid place-content-center gap-20"
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
        <div className="flex gap-3 text-white font-medium text-[1em]">
          <div className="bg-[#1e1f20] hover:bg-[#262627] aspect-square rounded-2xl max-w-[14em] p-4 cursor-pointer relative">
            <p>Help me craft an OOO message based on a few details</p>
            <i
              className="fa fa-pencil absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
              aria-hidden="true"
            ></i>
          </div>
          <div className="bg-[#1e1f20] hover:bg-[#262627] aspect-square rounded-2xl max-w-[14em] p-4 cursor-pointer relative">
            <p>Help me find YouTube videos to care for a specific plant</p>
            <i
              className="fa fa-youtube-play absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
              aria-hidden="true"
            ></i>
          </div>
          <div className="bg-[#1e1f20] hover:bg-[#262627] aspect-square rounded-2xl max-w-[14em] p-4 cursor-pointer relative">
            <p>Outline an organized & logical sales pitch for a new product</p>
            <i
              className="fa fa-lightbulb-o absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
              aria-hidden="true"
            ></i>
          </div>
          <div className="bg-[#1e1f20] hover:bg-[#262627] aspect-square rounded-2xl max-w-[14em] p-4 cursor-pointer relative">
            <p>Write me a basic HTML code</p>
            <i
              className="fa fa-code absolute bottom-3 right-3 bg-[#131314] p-4 rounded-full"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </ScrollShadow>
      <div className="mt-auto text-center">
        <Input
          className="w-[60em]"
          size="lg"
          endContent={
            <div className="flex items-center">
              <Tooltip content="Upload Image">
                <div className="flex items-center cursor-pointer hover:bg-[#1e1f20] py-2 px-3 rounded-full">
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
              <Tooltip content="Submit">
                <button type="submit">
                  <i
                    className="fa fa-paper-plane-o p-3 rounded-full hover:bg-[#1e1f20] cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </button>
              </Tooltip>
            </div>
          }
          radius="full"
          placeholder="Enter a prompt here"
        />
        <p className="mt-2 text-sm">
          Bard may display inaccurate info, including about people, so
          double-check its responses.{" "}
          <a
            className="underline"
            href="https://support.google.com/gemini/answer/13594961?visit_id=638455251086324999-4094199448&p=privacy_notice&rd=1#privacy_notice"
          >
            Your privacy & Gemini Apps
          </a>
        </p>
      </div>
    </div>
  );
};

export default Chat;
