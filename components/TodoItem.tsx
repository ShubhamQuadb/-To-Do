'use client';

import React from 'react';

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
  return (
    <li className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition">
      {todo.isEditing ? (
        <input
          className="flex-1 px-3 py-2 border border-orange-300 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="text"
          value={todo.text}
          onChange={(e) => onUpdate(todo.id, e.target.value)}
        />
      ) : (
        <span className="flex-1 text-gray-800 font-medium">{todo.text}</span>
      )}
      <div className="flex gap-2 ml-3">
        <button
          onClick={() => onEdit(todo.id)}
          className="text-orange-600 hover:text-orange-800 text-lg transition"
          title={todo.isEditing ? 'Save' : 'Edit'}
        >
          {todo.isEditing ? '✔' : '✏️'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 text-lg transition"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
