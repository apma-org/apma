import React, { useState } from "react";

export const Modal = ({ close, children }) => {
  return (
    <>
      <div
        className="modal-bg z-0"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "rgba(255,255,255,0.5)",
          height: "100%",
          width: "100%",
        }}
        onClick={close}
      ></div>
      <div
        className="bg-green-100 text-gray-50 p-8 rounded-3xl fixed z-50"
        style={{
          maxHeight: "90%",
          maxWidth: "80%",
          minWidth: "50%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <p
          className="text-5xl absolute right-3 top-0 cursor-pointer"
          onClick={close}
        >
          &times;
        </p>
        <div
          className="content-container overflow-scroll"
          style={{ maxHeight: "80vh" }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
