import React, { useState } from "react";

const Navleft = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className="min-h-screen inline-flex flex-col justify-between bg-[#1e1f20] px-4 py-6 text-white font-medium">
      <div className="flex flex-col gap-8">
        <i
          onClick={() => setOpen(!open)}
          className="fa fa-bars text-xl mb-10 cursor-pointer pl-4"
          aria-hidden="true"
        ></i>
        <div className={`flex gap-4 rounded-full bg-[#131314] justify-center items-center p-4 w-fit cursor-pointer`}>
          <i className="fa fa-plus" aria-hidden="true"></i>
          {open ? <p>New Chat</p> : null}
        </div>
        {open ? (
          <div className="flex flex-col gap-2">
            <p className="pl-4">Recent</p>
            <div className="flex gap-4 py-2 px-4 items-center hover:bg-zinc-700 hover:rounded-full">
              <i className="fa fa-comment-o" aria-hidden="true"></i>
              <p>Welcome back Bard!</p>
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <div className="flex gap-4 py-2 px-4 items-center hover:bg-zinc-700 hover:rounded-full">
          <i className="fa fa-question-circle" aria-hidden="true"></i>
          {open ? <p>Help</p> : null}
        </div>
        <div className="flex gap-4 py-2 px-4 items-center hover:bg-zinc-700 hover:rounded-full">
          <i className="fa fa-history" aria-hidden="true"></i>
          {open ? <p>Activity</p> : null}
        </div>
        <div className="flex gap-4 py-2 px-4 items-center hover:bg-zinc-700 hover:rounded-full">
          <i className="fa fa-cog" aria-hidden="true"></i>
          {open ? <p>Settings</p> : null}
        </div>
      </div>
    </aside>
  );
};

export default Navleft;
