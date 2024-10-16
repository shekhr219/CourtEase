import React from "react";

const AddCenterModel = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-10">
        <button className="absolute top-2 right-2" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default AddCenterModel;
