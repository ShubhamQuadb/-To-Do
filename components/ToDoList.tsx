'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  isEditing: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleUpdate = (id: number, text: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6">
        <div className="text-3xl font-bold text-center text-orange-600 mb-6 flex justify-center">
          {' My To-Do List'.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 10,
                delay: index * 0.05,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">

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

        <ul className="space-y-3 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 pr-1">
          {todos.map((todo, i) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={i}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
