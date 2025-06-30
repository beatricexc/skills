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
        <label className="text-sm font-medium text-gray-700 block mb-1">Comparison</label>
        <select
          className="border p-2 rounded text-sm"
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
        <label className="text-sm font-medium text-gray-700 block mb-1">Level</label>
        <select
          className="border p-2 rounded text-sm"
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