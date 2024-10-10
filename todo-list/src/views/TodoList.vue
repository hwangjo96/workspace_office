<template>
  <div>
    <h2>오늘 날짜: {{ todayDate }}</h2>

    <h3>리스트 총 개수: {{ totalCount }}</h3>
    <h3>완료된 리스트 개수: {{ completedCount }}</h3>

    <!-- 정렬 기준을 위한 새로운 div -->
    <div class="sort-container">
      <select v-model="sortOrder">
        <option value="newest">최신순</option>
        <option value="oldest">오래된 순</option>
      </select>
    </div>

    <div class="input-container"> <!-- 입력란과 버튼을 위한 새로운 div -->
      <input v-model="newTodo" placeholder="할 일을 입력하세요" />
      <button @click="addTodo">등록</button>
    </div>

    <ul>
      <!-- TodoItem 컴포넌트를 통해 각 리스트 항목을 렌더링 -->
      <TodoItem v-for="todo in sortedTodos" :key="todo.id" :todo="todo" @deleteTodo="deleteTodo"
        @toggleTodo="toggleTodo" />
    </ul>

    <button @click="clearAllTodos">전체 삭제</button>
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
      newTodo: "", // 사용자가 입력한 새로운 투두
      sortOrder: "newest", // 정렬 기준 (최신순, 오래된 순)
      todayDate: this.formatDate(new Date()), // 오늘 날짜
    };
  },
  computed: {
    todos() {
      const todoStore = useTodoStore();
      return todoStore.todos;
    },
    totalCount() {
      return this.todos.length; // 전체 리스트 개수
    },
    completedCount() {
      return this.todos.filter((todo) => todo.completed).length; // 완료된 리스트 개수
    },
    sortedTodos() {
      return this.todos.slice().sort((a, b) => {
        if (this.sortOrder === "newest") {
          return new Date(b.date) - new Date(a.date);
        } else {
          return new Date(a.date) - new Date(b.date);
        }
      });
    },
  },
  methods: {
    formatDate(date) {
      // 원하는 날짜 형식으로 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 만들기
      const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 만들기
      return `${year}. ${month}. ${day}`;
    },
    addTodo() {
      if (this.newTodo.trim()) {
        const todoStore = useTodoStore();
        todoStore.addTodo(this.newTodo); // 새로운 투두 추가
        this.newTodo = "";
      }
    },
    deleteTodo(id) {
      const todoStore = useTodoStore();
      todoStore.deleteTodo(id); // 투두 삭제
    },
    toggleTodo(id) {
      const todoStore = useTodoStore();
      todoStore.toggleTodo(id); // 투두 완료 여부 토글
    },
    clearAllTodos() {
      const todoStore = useTodoStore();
      todoStore.clearAllTodos(); // 전체 투두 삭제
    },
  },
};
</script>

<style scoped>
.sort-container {
  margin-bottom: 10px; /* 정렬 기준과 입력란 간의 간격 조정 */
}

.input-container {
  display: flex; /* Flexbox로 요소를 수평으로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 10px; /* 요소 간의 간격 조정 */
}
</style>
