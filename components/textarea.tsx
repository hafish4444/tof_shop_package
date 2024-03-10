import React from 'react';

interface TextareaProps {
  id: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string | number | undefined;
  label: string;
  disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ id, onChange, value, label, disabled }) => {
  return (
    <div className={`relative w-full ${disabled ? "opacity-80" : ""}`}>
      <textarea
        onChange={onChange}
        value={value as string} // Adjust the type as needed
        id={id}
        className={`
          pt-[16px] pb-[3px] 
          px-3
          text-white
          bg-[#6346AA]
          text-md 
          rounded-[4px]
          block
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
          invalid:border-b-1
          w-full
          ${disabled ? "bg-[#6346AA90]" : ""}
        `}
        placeholder=" "
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="
          absolute 
          text-md
          text-[#CFCFCF]
          duration-150 
          transform 
          -translate-y-2
          scale-75 
          top-2
          z-8
          origin-[0] 
          left-3
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-2
        "
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;