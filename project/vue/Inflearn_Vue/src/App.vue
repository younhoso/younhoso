<template>
  <div id="app">
    <TodoHeader />
    <TodoInput v-on:addTodoItme="addItem" />
    <TodoList
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"
    />
    <TodoFooter v-on:clearAll="clearAllItem" />
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data: function () {
    return {
      todoItems: [],
    };
  },
  methods: {
    addItem: function (todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem: function (item, idx) {
      localStorage.removeItem(item.item);
      this.todoItems.splice(idx, 1);
    },
    toggleOneItem: function (item, idx) {
      this.todoItems[idx].completed = !this.todoItems[idx].completed;
      localStorage.removeItem(item.item);
      localStorage.setItem(item.item, JSON.stringify(item));
    },
    clearAllItem: function () {
      localStorage.clear();
      this.todoItems = [];
    },
  },
  created: function () {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        this.todoItems.push(obj);
      }
    }
  },
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #eee;
}
input {
  border-style: #eee;
  width: 200px;
}
button {
  border-style: #eee;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
