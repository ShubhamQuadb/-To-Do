'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  isEditing: boolean;
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Each item comes one by one
    },
  },
};

const headingVariants = {
  hidden: { opacity: 1 },
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 10,
    },
  },
};


export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = { id: Date.now(), text: input.trim(), isEditing: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    ));
  };

  const handleUpdate = (id: number, text: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text, isEditing: false } : todo
    ));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">🔥 My To-Do List</h2>

        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-orange-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
            placeholder="Enter your task..."
          />
          <button
            onClick={handleAddTodo}
            className="bg-orange-500 text-white px-5 py-2 rounded-r-md hover:bg-orange-600 transition"
          >
            Add
          </button>
        </div>

        <motion.ul
          className="space-y-3 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 pr-1"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
