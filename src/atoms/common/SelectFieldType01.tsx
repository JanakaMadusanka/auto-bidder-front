import React from 'react';

interface SelectFieldType01Props {
  title: string;
  options: string[];
  classNames?: string;
}

const SelectFieldType01: React.FC<SelectFieldType01Props> = ({ title, options, classNames }) => {
  return (
    <div className={`mb-4 ${classNames}`}>
      <label className="block text-gray-600 text-sm font-semibold mb-1  ">{title}</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldType01;