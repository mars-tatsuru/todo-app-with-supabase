<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { getTodos, addTodo, deleteTodo, updateTodo }  from "../util/supabaseFunctions";
import Pagination from "@/components/Pagination.vue";

type List = {
  id: number;
  title: string;
  isCompleted: boolean;
};

const todoList = ref<List[]>([]);
const todoItemText = ref<string>("");


const getList = async () => {
  const todo = await getTodos();
  todoList.value = todo as List[];
}

const addList = async (title: string) => {
  await addTodo(title);
  todoItemText.value = "";
  getList();
}

const updateItem = async (id: number, isCompleted:boolean) => {
  await updateTodo(id,isCompleted);
  getList();
}

const deleteItem = async (id: number) => {
  await deleteTodo(id);
  getList();
}

onMounted(() => {
  getList();
});

</script>

<template>
  <div class="todoListWrapper">
    <div class="todoListAddArea">
      <input
        v-model="todoItemText"
        type="text"
        placeholder="Add a new todo"
      />
      <button
        :disabled="todoItemText === ''"
        @click="addList(todoItemText)"
      >
        Add
      </button>
    </div>
    <ul class="todoListArea">
      <li
        v-for="todo in todoList"
        :key="todo.id"
      >
        <input
          type="checkbox"
          @click="updateItem(todo.id, todo.isCompleted)"
          :checked="todo.isCompleted"
        />
        <span
          :class="{'done': todo.isCompleted}"
        >
          {{todo.title}}
        </span>
        <div
          class="deleteBtn"
          @click="deleteItem(todo.id)"
        >
          <span></span>
          <span></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.todoListWrapper{
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;


  .todoListAddArea{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;

    input{
      width: 100%;
      padding: 10px;
      border: 1px solid #7ea6da;
      border-radius: 5px;
      font-size: 16px;
    }

    button{
      padding: 10px 20px;
      border: 1px solid #7ea6da;
      border-radius: 5px;
      background: #7ea6da;
      color: #fff;
      font-size: 16px;
      cursor: pointer;

      &[disabled]{
        opacity: 0.5;
        cursor: not-allowed;
      }

    }

  }

  .todoListArea{
    list-style: none;
    padding: 0;
    margin: 0;

    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      gap: 10px;
      background-color: #7ea6da;
      border-radius: 5px;
      padding: 10px;

      input{
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      span{
        width: calc(100% - 40px);
        font-size: 16px;
        color: #ffffff;
        font-weight: 600;

        &.done{
          text-decoration: line-through;
        }

      }

      .deleteBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;

        span{
          position: absolute;
          top: 50%;
          left: 0;
          display: block;
          width: 20px;
          height: 2px;
          background-color: #fff;
          transform-origin: center top;
          transform: rotate(45deg) translateY(-50%);
        }

        span:last-child{
          top: 47%;
          transform: rotate(-45deg);
        }
      }

    }
  }
}
</style>
