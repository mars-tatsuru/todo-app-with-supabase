<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { getTodos, addTodo, deleteTodo, updateTodo }  from "../util/supabaseFunctions";
import Pagination from "@/components/Pagination.vue";

type List = {
  id: number;
  title: string;
  isCompleted: boolean;
  who: string;
};

const todoList = ref<List[]>([]);
const todoItemText = ref<string>("");
const todoItemWho = ref<string>("");
const displayFlag = ref<boolean>(false);
const selectData = ["tatsuru", "ayaka", "together"]


const getList = async () => {
  const todo = await getTodos();
  const sortedList = todo?.sort((a, b) => a.id - b.id);
  todoList.value = sortedList as List[];
}

const addList = async (title: string, who: string) => {
  await addTodo(title, who);
  todoItemText.value = "";
  todoItemWho.value = "";
  displayFlag.value = !displayFlag.value;
  getList();
}

// const updateItem = async (id: number, isCompleted:boolean) => {
//   await updateTodo(id,isCompleted);
//   getList();
// }

const deleteItem = async (id: number) => {
  await deleteTodo(id);
  getList();
}

const modalDisplay = () => {
  displayFlag.value = !displayFlag.value;
  todoItemText.value = "";
  todoItemWho.value = "";
}

onMounted(() => {
  getList();
});

</script>

<template>
  <div class="todoListWrapper">
    <h1>TODO LIST</h1>
    <div
      class="todoListAddArea"
      :class="{'active': displayFlag}"
    >
    <h2>予定入力欄</h2>
    <div class="typeTodo">
      <p>やることを入力</p>
      <input
        v-model="todoItemText"
        type="text"
        placeholder="Add a new todo"
      />
    </div>
    <div class="selectData">
      <div
        class="deleteBtn"
        @click="modalDisplay"
      >
        <span></span>
        <span></span>
      </div>
      <p>誰の予定？</p>
      <label
        v-for="data in selectData"
        :key="data"
        :for="data"
        >
        <input
          v-model="todoItemWho"
          :id="data"
          type="radio"
          name="who"
          :value="data"
        />
        {{ data }}
      </label>
    </div>
    <button
      :disabled="todoItemText === '' || todoItemWho === ''"
      @click="addList(todoItemText,todoItemWho)"
    >
      予定を追加する
    </button>
    </div>
    <div class="overflow">
      <ul class="todoListArea">
        <li
          v-for="todo in todoList"
          :key="todo.id"
          :data="todo.who"
        >
          <div class="todoListAreaInner">
            <p v-if="todo.who === 'tatsuru'">たつる</p>
            <p v-else-if="todo.who === 'ayaka'">あやか</p>
            <p v-if="todo.who === 'together'">ふたり</p>
            <span
              :class="{'done': todo.isCompleted}"
            >
              {{todo.title}}
            </span>
          </div>
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
    <div
      class="todoListAddStartBtn"
      @click="modalDisplay"
    >
      <p>予定を追加する</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todoListWrapper{
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;

  h1{
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 30px;

    @media screen and (max-width: 767px) {
      font-size: 24px;
      margin-bottom: 15px;
    }

  }

  .todoListAddArea{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .88);
    z-index: 1000;
    padding: 0 calc(50% - 300px);
    display: none;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 767px) {
      padding: 20px;
    }

    .deleteBtn{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      position: absolute;
      top: 200px;
      right: calc(50% - 300px);

      @media screen and (max-width: 767px) {
        top: 30px;
        right: 30px;
      }

      span{
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 30px;
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

    h2{
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 40px;
    }

    .typeTodo{
      margin-bottom: 30px;

      p{
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 10px;
      }

      input{
        width: 100%;
        padding: 10px;
        border: 1px solid #7ea6da;
        border-radius: 5px;
        font-size: 16px;
      }
    }

    .selectData{

      margin-bottom: 30px;

      p{
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 20px;
      }

      label{
        display: flex;
        align-items: center;
        margin-right: 20px;
        font-size: 16px;
        letter-spacing: 0.06em;
        color: #fff;
        margin-bottom: 20px;

        input{
          margin-right: 10px;
          width: 20px;
          height: 20px;

          &:checked{
            background-color: #7ea6da;
          }
        }

        &:last-child{
          margin-right: 0;
        }

      }

    }

    button{
      padding: 10px 20px;
      border: 1px solid #2465CA;
      border-radius: 5px;
      background-color: #2465CA;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      width: 100%;

      &[disabled]{
        opacity: 0.5;
        cursor: not-allowed;
      }

    }

    &.active{
      display: flex;
    }

  }

  .overflow{
    overflow: scroll;
    height: calc(100vh - 230px);
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 30px;

    @media screen and (max-width: 767px) {
      height: calc(100vh - 280px);
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
        border-radius: 5px;
        padding: 10px;

        .todoListAreaInner{

          p{
            width: 55px;
            height: 22px;
            border-radius: 100px;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #808080;
            line-height: 1;
            letter-spacing: 0.08em;

            @media screen and (max-width: 767px) {
              width: 42.5px;
              height: 18px;
              font-size: 10px;
              margin-bottom: 5px;
              letter-spacing: 0.03em;
            }

          }

          span{
            width: calc(100% - 40px);
            font-size: 16px;
            color: #ffffff;
            font-weight: 600;

            @media screen and (max-width: 767px) {
              font-size: 14.5px;
            }

            &.done{
              text-decoration: line-through;
            }

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

        &[data="tatsuru"]{
          background-color: 	#3CB371;
        }

        &[data="ayaka"]{
          background-color: 	#F06060;
        }

        &[data="together"]{
          background-color: 	#fd9f3a;
        }

        &:nth-last-child(1){
          margin-bottom: 0;
        }

      }

    }

  }

  .todoListAddStartBtn{
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    height: 50px;
    border-radius: 5px;
    background-color: #2465CA;

    @media screen and (max-width: 767px) {
      bottom: 20px;
    }


    p{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }

    &:hover{
      opacity: 0.8;
    }

  }

}
</style>
