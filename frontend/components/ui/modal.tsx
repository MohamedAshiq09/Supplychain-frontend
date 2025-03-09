import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg w-full max-w-md">
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};