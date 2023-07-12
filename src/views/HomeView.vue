<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { getTodos, addTodo, deleteTodo, deleteListBeforeOrderTodo, insertAndOrderTodo }  from "../util/supabaseFunctions";
import Pagination from "@/components/Pagination.vue";
import draggable from 'vuedraggable'

type List = {
  id: number;
  title: string;
  isCompleted: boolean;
  who: string;
  work: boolean;
  order:number;
};

const todo = ref<any>([]);
const todoList = ref<List[]>([]);
const todoItemText = ref<string>("");
const todoItemWho = ref<string>("");
const todoItemWork = ref<string>("");
const displayFlag = ref<boolean>(false);
const selectData = ["tatsuru", "ayaka", "together"]
const selectWorkData = ["private", "work"]


const getList = async () => {
  todo.value = await getTodos();
  const privateList = todo.value?.filter((item: any) => item.work === "private");
  todoList.value = privateList as List[];
  console.log(todoList.value)
}

const addList = async (title: string, who: string, work: string) => {
  await addTodo(title, who, work);
  todoItemText.value = "";
  todoItemWho.value = "";
  todoItemWork.value = "";
  displayFlag.value = !displayFlag.value;
  getList();
}

const deleteItem = async (id: number) => {
  await deleteTodo(id);
  getList();
}

const modalDisplay = () => {
  displayFlag.value = !displayFlag.value;
  todoItemText.value = "";
  todoItemWho.value = "";
  todoItemWork.value = "";
}

// ドラッグして並べ替えする関数
const dragEnd = async (e: any) => {

  // findで配列の中から条件に一致する要素を取得
  // 一番上にドラッグした時の対処
  if (e.newIndex === 0) {
    todoList.value[e.newIndex].order = 1
    for (let i = 1; i < e.oldIndex + 1; i++) {
      todoList.value[i].order = i + 1
      console.log(todoList.value[i].title,todoList.value[i].order);
    }
    console.log(todoList.value);
  } else if(e.newIndex === todoList.value.length - 1) {
    // 一番下にドラッグした時の対処
    todoList.value[e.newIndex].order = todoList.value[e.newIndex - 1].order + 1
    for(let i = e.oldIndex; i < e.newIndex; i++){
      todoList.value[i].order = todoList.value[i].order - 1
      console.log(todoList.value[i].title,todoList.value[i].order);
    }
    console.log(todoList.value);
  } else if(e.oldIndex === todoList.value.length - 1){
    // 一番下から一つ上にドラッグした時の対処
    todoList.value[e.newIndex].order = todoList.value[e.newIndex - 1].order + 1
    for(let i = e.oldIndex; i > e.newIndex; i--){
      todoList.value[i].order = todoList.value[i].order + 1
      console.log(todoList.value[i].title,todoList.value[i].order);
    }
    console.log(todoList.value);
  } else if(e.oldIndex === 0){
    // 一番上から一つ下にドラッグした時の対処
    todoList.value[e.newIndex].order = todoList.value[e.newIndex + 1].order - 1
    for(let i = e.oldIndex; i < e.newIndex; i++){
      todoList.value[i].order = todoList.value[i].order + 1
      console.log(todoList.value[i].title,todoList.value[i].order);
    }
    console.log(todoList.value);
  } else {
    // それ以外の時の対処(既存のidを被らないようにする)
    if (e.newIndex > e.oldIndex) {
      for(let i = e.oldIndex; i < e.newIndex; i++){
        // 連番の間に入った時の対処
        if (todoList.value[i].order === todoList.value[i + 1].order) {
          todoList.value[i].order = todoList.value[i].order + 1
        } else {
          todoList.value[i].order = todoList.value[i].order - 1
        }
        todoList.value[e.newIndex].order = todoList.value[e.newIndex - 1].order + 1
        console.log(todoList.value[i].title,todoList.value[i].order);
      }
      console.log(todoList.value);
    } else {
      for(let i = e.newIndex + 1; i < e.oldIndex + 1; i++){
        // 連番の間に入った時の対処
        if (todoList.value[i].order === todoList.value[i + 1].order) {
          todoList.value[i].order = todoList.value[i].order - 1
        } else {
          todoList.value[i].order = todoList.value[i].order + 1
        }
        todoList.value[e.newIndex].order = todoList.value[e.newIndex + 1].order - 1
        console.log(todoList.value[i].title,todoList.value[i].order);
      }
      console.log(todoList.value);
    }
  }


  await deleteListBeforeOrderTodo(todo.value)
  console.log("delete");
  await insertAndOrderTodo(todoList.value)
  console.log("insert");

}

onMounted(() => {
  getList();
});

</script>

<template>
  <div class="todoListWrapper">
    <div class="header">
      <h1>TODO LIST</h1>
      <RouterLink
        to="/work"
        class="changePage"
      >
        仕事モードへ
      </RouterLink>
    </div>
    <div
      class="todoListAddArea"
      :class="{'active': displayFlag}"
    >
    <div
        class="deleteBtn"
        @click="modalDisplay"
      >
        <span></span>
        <span></span>
    </div>
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
      <p>誰の予定？</p>
      <div class="selectRadioArea">
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
    </div>
    <div class="selectData">
      <p>お仕事なのかい？</p>
      <div class="selectRadioArea">
        <label
          v-for="data in selectWorkData"
          :key="data"
          :for="data"
          >
          <input
            v-model="todoItemWork"
            :id="data"
            type="radio"
            name="work"
            :value="data"
          />
          {{ data }}
        </label>
      </div>
    </div>
    <button
      :disabled="todoItemText === '' || todoItemWho === ''"
      @click="addList(todoItemText,todoItemWho, todoItemWork)"
    >
      予定を追加する
    </button>
    </div>
    <div class="overflow">
      <draggable
        class="todoListArea"
        :list="todoList"
        item-key="id"
        :animation="200"
        :tag="'ul'"
        ghost-class="ghost-card"
        @end="dragEnd($event)"
      >
        <template
          #item="{ element }"
        >
        <li
          :data="element.who"
        >
          <div class="todoListAreaInner">
            <p v-if="element.who === 'tatsuru'">たつる</p>
            <p v-else-if="element.who === 'ayaka'">あやか</p>
            <p v-if="element.who === 'together'">ふたり</p>
            <span
              :class="{'done': element.isCompleted}"
            >
              {{element.title}}
            </span>
          </div>
          <div
            class="deleteBtn"
            @click="deleteItem(element.id)"
          >
            <span></span>
            <span></span>
          </div>
        </li>
        </template>
      </draggable>
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

  .header{

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    h1{
      text-align: center;
      font-size: 40px;
      font-weight: bold;

      @media screen and (max-width: 767px) {
        font-size: 30px;
      }

    }

    .changePage{
      border: 0;
      background-color: #2465CA;
      display: flex;
      align-items: center;
      padding: 10px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 12px;
      color: #fff;
      font-weight: bold;
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
      margin-bottom: 40px;

      p{
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 10px;

        @media screen and (max-width: 767px) {
          font-size: 16px;
        }

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

      margin-bottom: 40px;

      p{
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 20px;

        @media screen and (max-width: 767px) {
          font-size: 16px;
        }

      }

      .selectRadioArea{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        label{
          display: flex;
          align-items: center;
          font-size: 16px;
          letter-spacing: 0.06em;
          color: #fff;

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
            margin-bottom: 0;
          }

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
      height: calc(100vh - 300px);
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
        cursor: pointer;

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
