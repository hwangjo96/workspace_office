import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [], // 투두 리스트 상태
  }),
  actions: {
    addTodo(text) {
      // 새로운 투두 추가
      this.todos.push({
        id: Date.now(),
        text: text,
        completed: false,
        date: new Date().toLocaleString(), // 등록 시간
      });
    },
    deleteTodo(id) {
      // 투두 삭제
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    toggleTodo(id) {
      // 완료 여부 토글
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    clearAllTodos() {
      // 모든 투두 삭제
      this.todos = [];
    },
  },
});
