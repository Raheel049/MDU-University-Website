import React from 'react';

const ButtonComp = ({ text, icon: Icon, onClick, bgColor, width, className }) => {
  return (
    <button 
      onClick={onClick}
      style={{ 
        // Agar bgColor prop aaye to wo apply ho, warna Tailwind ki class sambhaal le
        backgroundColor: bgColor, 
        width: width 
      }}
      className={className}
    >
      {/* Icon size and spacing */}
      {Icon && <Icon size={20} />}
      <span className="font-normal text-[16px]">{text}</span>
    </button>
  );
};

export default ButtonComp;