import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

export const Modal = ({ title, isOpen, handleClose, children }) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-80 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog onClose={handleClose} className=".shadow-xl fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-40" />
          <div className="my-8 inline-block w-full max-w-md transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-medium leading-6 text-green-600">{title}</Dialog.Title>
              <FaTimes className="cursor-pointer text-sm" onClick={handleClose} />
            </div>
            <div className="mt-3">{children}</div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ModelBody = ({ children }) => {
  return <div className="my-4">{children}</div>;
};