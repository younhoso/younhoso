<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />

    <span v-on:click="addTodo" class="addContainer">
      <i class="ic-plus addBtn"></i>
    </span>

    <Modal @close="showModal = false">
      <div class="showModal" v-bind:class="{ active: showModal }" slot="body">
        <div class="inner">
          <h3>
            경고!
            <i class="ic-close closeModalBtn" @click="showModal = false"></i>
          </h3>
          <p>아무것도 입력하지 않으셨습니다.</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./common/Modal.vue";

export default {
  data: function () {
    return {
      newTodoItem: "",
      showModal: false,
    };
  },
  methods: {
    addTodo: function () {
      if (this.newTodoItem !== "") {
        this.$emit("addTodoItme", this.newTodoItem);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput: function () {
      this.newTodoItem = "";
    },
  },
  components: {
    Modal: Modal,
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  display: flex;
}

.inputBox input {
  width: 100%;
  height: 100%;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  width: 4rem;
  background: linear-gradient(to right, #6478f8, #8763fb);
  display: block;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.addBtn {
  color: white;
  vertical-align: middle;
  font-size: 22px;
  font-weight: 800;
}

.showModal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}

.showModal.active {
  opacity: 1;
  visibility: visible;
}

.showModal .inner {
  width: 90%;
  background-color: #fff;
}

.closeModalBtn {
  color: #42b983;
}
</style>
