import TodoList from "../components/ToDoList";





export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-200 to-orange-300 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
    
        <TodoList />
      </div>
    </main>
  );
}
