'use client';
import { useState } from 'react';
import { comparisonOperators, levels } from './data';

export default function LevelFilter({
  onChange,
}: {
  onChange: (filter: { operator: string; level: number }) => void;
}) {
  const [operator, setOperator] = useState('=');
  const [level, setLevel] = useState(1);

  function handleUpdate(newOperator: string, newLevel: number) {
    onChange({ operator: newOperator, level: newLevel });
  }

  return (
    <div className="flex gap-4 items-center">
      <div>
        <label className="text-sm font-medium text-[#234F8E] block mb-1">Comparison</label>
        <select
          className="
          block w-full px-4 py-2 text-sm rounded-lg
          bg-[rgba(255,255,255,0.2)] backdrop-blur-sm
          border border-[rgba(244,244,244,0.3)]
          focus:outline-none focus:ring-2 focus:ring-[#A1DAD7] focus:border-transparent
          transition
        "
          value={operator}
          onChange={(e) => {
            const newOperator = e.target.value;
            setOperator(newOperator);
            handleUpdate(newOperator, level);
          }}
        >
          {comparisonOperators.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-[#234F8E] block mb-1">Level</label>
        <select
          className="
          block w-full px-4 py-2 text-sm rounded-lg
          bg-[rgba(255,255,255,0.2)] backdrop-blur-sm
          border border-[rgba(244,244,244,0.3)]
          focus:outline-none focus:ring-2 focus:ring-[#A1DAD7] focus:border-transparent
          transition
        "
          value={level}
          onChange={(e) => {
            const newLevel = parseInt(e.target.value);
            setLevel(newLevel);
            handleUpdate(operator, newLevel);
          }}
        >
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}