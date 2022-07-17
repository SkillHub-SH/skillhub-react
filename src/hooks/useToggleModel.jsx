import React from "react";

const useToggleModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, toggleModal];
};

export default useToggleModal;