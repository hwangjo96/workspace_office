<template>
  <div class="app-container">
    <div>
      <h2>오늘 날짜: {{ todayDate }}</h2>
      <h3> <span>{{ completedCount }}</span> / {{ totalCount }}</h3>

      <div class="input-container">
        <input v-model="newTodo" placeholder="할 일을 입력하세요" @keyup.enter="addTodo" />
        <button @click="addTodo">등록</button>
      </div>

      <div class="sort-container">
        <select v-model="sortOrder">
          <option value="newest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
        <select v-model="filterStatus">
          <option value="all">모두 보기</option>
          <option value="completed">완료 항목 보기</option>
          <option value="incomplete">미완료 항목 보기</option>
        </select>
      </div>

      <ul>
        <TodoItem v-for="todo in filteredSortedTodos" :key="todo.id" :todo="todo" @deleteTodo="deleteTodo"
          @toggleTodo="toggleTodo" />
      </ul>

      <button @click="clearAllTodos">전체 삭제</button>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from "../store/todoStore";
import TodoItem from "../components/TodoItem.vue";

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: "",
      sortOrder: "newest",
      filterStatus: "all", // 필터 상태 추가
      todayDate: this.formatDate(new Date()),
    };
  },
  computed: {
    todos() {
      const todoStore = useTodoStore();
      return todoStore.todos;
    },
    totalCount() {
      return this.todos.length;
    },
    completedCount() {
      return this.todos.filter((todo) => todo.completed).length;
    },
    filteredSortedTodos() {
      // 필터링 및 정렬
      let filteredTodos = this.todos;

      // 완료된 것만 보기 또는 완료되지 않은 것만 보기
      if (this.filterStatus === "completed") {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
      } else if (this.filterStatus === "incomplete") {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
      }

      // 정렬
      return filteredTodos.slice().sort((a, b) => {
        if (this.sortOrder === "newest") {
          return b.date - a.date;
        } else {
          return a.date - b.date;
        }
      });
    },
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}. ${month}. ${day}`;
    },
    addTodo() {
      if (this.newTodo.trim()) {
        const todoStore = useTodoStore();
        todoStore.addTodo(this.newTodo);
        this.newTodo = "";
      }
    },
    deleteTodo(id) {
      const todoStore = useTodoStore();
      todoStore.deleteTodo(id);
    },
    toggleTodo(id) {
      const todoStore = useTodoStore();
      todoStore.toggleTodo(id);
    },
    clearAllTodos() {
      const todoStore = useTodoStore();
      todoStore.clearAllTodos();
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* 정렬 */
.sort-container {
  display: flex; 
  justify-content: left; 

  margin-bottom: 10px;

  gap: 10px; 
}

/* 입력 */
.input-container {
  display: flex;
  justify-content: left; 
  align-items: center;

  text-align: center;

  gap: 10px;

  margin-bottom: 20px;
}

input {
  height: 20px; 
}

button {
  height: 20px; 
  padding: 8px 16px;

  display: inline-flex;
  align-items: center; 
  justify-content: center; 

  border: none;
  
  background-color: #50C878;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #009473; 
}

ul {
  padding: 0;
}

h3 > span{
  font-size: 24px;
  font-weight: bold;
}
</style>
