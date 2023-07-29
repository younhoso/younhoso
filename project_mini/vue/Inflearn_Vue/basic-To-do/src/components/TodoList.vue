<template>
  <transition-group name="list" tag="ul">
    <li
      class="shadow"
      v-for="(value, idx) in this.storedTodoItems"
      v-bind:key="value.item">
      <i
        class="ic-check checkBtn"
        v-bind:class="{ checkBtnCompleted: value.completed }"
        v-on:click="toggleComplete({value, idx})"
      >
      </i>
      <span v-bind:class="{ textCompleted: value.completed }">{{
        value.item
      }}</span>
      <span class="removeBtn" v-on:click="removeTodo({value, idx})">
        <i class="ic-bin"></i>
      </span>
    </li>
  </transition-group>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations({
      removeTodo: 'removeOneItem',
      toggleComplete: 'toggleOneItem'
    })
  },
  computed: {
    ...mapGetters(['storedTodoItems'])
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
  justify-content: space-between;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.removeBtn {
  color: #de4343;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
