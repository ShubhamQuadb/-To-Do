'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 

interface Todo {
  id: number;
  text: string;
  isEditing: boolean;
}

interface Props {
  todo: Todo;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

export default function TodoItem({ todo, onEdit, onDelete, onUpdate }: Props) {
  const [editText, setEditText] = useState(todo.text);

  useEffect(() => {
    if (todo.isEditing) {
      setEditText(todo.text);
    }
  }, [todo.isEditing, todo.text]);

  const handleSave = () => {
    onUpdate(todo.id, editText.trim());
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
    >
      {todo.isEditing ? (
        <input
          className="flex-1 px-3 py-2 border border-orange-300 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span className="flex-1 text-gray-800 font-medium">{todo.text}</span>
      )}

      <div className="flex gap-2 ml-3">
        {todo.isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-800 text-lg transition"
            title="Save"
          >
            ✔
          </button>
        ) : (
          <button
            onClick={() => onEdit(todo.id)}
            className="text-orange-600 hover:text-orange-800 text-lg transition"
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 text-lg transition"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </motion.li>
  );
}
