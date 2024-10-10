<template>
    <li class="todo-item"> <!-- 클래스 추가 -->
        <input type="checkbox" :checked="todo.completed" @change="toggleTodo" />
        <span :class="{ 'text-decoration': todo.completed }">{{ todo.text }}</span> <!-- 완료 시 클래스 추가 -->
        <span class="todo-date"> - 등록일: {{ formatDate(todo.date) }}</span> <!-- 포맷된 날짜 사용 -->
        <button @click="deleteTodo">삭제</button>
    </li>
</template>

<script>
export default {
    props: {
        todo: Object,
    },
    methods: {
        deleteTodo() {
            this.$emit("deleteTodo", this.todo.id);
        },
        toggleTodo() {
            this.$emit("toggleTodo", this.todo.id);
        },
        formatDate(date) {
            const d = new Date(date);
            if (isNaN(d.getTime())) { // 유효성 검사
                console.error("Invalid date:", date);
                return date; // 원래 날짜 문자열 반환 (문제 해결 전까지)
            }
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0'); // 두 자리로 포맷
            const day = String(d.getDate()).padStart(2, '0'); // 두 자리로 포맷
            const hours = String(d.getHours()).padStart(2, '0'); // 두 자리로 포맷
            const minutes = String(d.getMinutes()).padStart(2, '0'); // 두 자리로 포맷
            const seconds = String(d.getSeconds()).padStart(2, '0'); // 두 자리로 포맷

            // 오전/오후 표시
            const ampm = d.getHours() >= 12 ? '오후' : '오전';

            // 날짜와 시간 포맷을 조정하여 점 제거
            return `${year}. ${month}. ${day} ${ampm} ${hours}:${minutes}:${seconds}`; 
        },
    },
};
</script>

<style scoped>
.todo-item {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.text-decoration {
    text-decoration: line-through;
}

.todo-date {
    margin-left: 5px; /* 날짜와 텍스트 사이에 간격 추가 */
}
</style>
