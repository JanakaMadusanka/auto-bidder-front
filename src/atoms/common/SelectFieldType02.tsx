import React from 'react';

interface OptionType {
  value: number;
  label: string;
}

interface SelectFieldType02Props {
  title: string;
  options: OptionType[]; 
  classNames?: string;
  value: number;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectFieldType02: React.FC<SelectFieldType02Props> = ({ title, options, classNames, value, name, onChange }) => {
  return (
    <div className={`mb-4 ${classNames}`}>
      <label className="block text-gray-600 text-sm font-semibold mb-1  ">{title}</label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        name={name}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldType02
;