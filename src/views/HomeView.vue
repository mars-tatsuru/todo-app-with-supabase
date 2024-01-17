<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import {
  getTodosForPrivate,
  addTodo,
  deleteTodo,
  deleteListBeforeOrderTodo,
  insertAndOrderTodo
} from '../util/supabaseFunctions'
import draggable from 'vuedraggable'

type List = {
  id: number
  title: string
  who: string
  work: boolean
  order: number
}

const todo = ref<any>([])
const todoList = ref<List[]>([])
const todoItemText = ref<string>('')
const todoItemWho = ref<string>('')
const todoItemWork = ref<string>('')
const displayFlag = ref<boolean>(false)
const selectData = ['tatsuru', 'ayaka', 'together']
const selectWorkData = ['private', 'work']

const getList = async () => {
  todo.value = await getTodosForPrivate()
}

const addList = async (title: string, who: string, work: string) => {
  await addTodo(title, who, work)
  todoItemText.value = ''
  todoItemWho.value = ''
  todoItemWork.value = ''
  displayFlag.value = !displayFlag.value
  getList()
}

const deleteItem = async (id: number) => {
  await deleteTodo(id)
  getList()
}

const modalDisplay = () => {
  displayFlag.value = !displayFlag.value
  todoItemText.value = ''
  todoItemWho.value = ''
  todoItemWork.value = ''
}

// ドラッグして並べ替えする関数
const dragEnd = async (e: any) => {
  // findで配列の中から条件に一致する要素を取得
  // 一番上にドラッグした時の対処
  if (e.newIndex === 0) {
    todo.value[e.newIndex].order = 1
    for (let i = 1; i < e.oldIndex + 1; i++) {
      todo.value[i].order = i + 1
    }
  } else if (e.newIndex === todo.value.length - 1) {
    // 一番下にドラッグした時の対処
    todo.value[e.newIndex].order = todo.value[e.newIndex - 1].order + 1
    for (let i = e.oldIndex; i < e.newIndex; i++) {
      todo.value[i].order = todo.value[i].order - 1
    }
  } else if (e.oldIndex === todo.value.length - 1) {
    // 一番下から一つ上にドラッグした時の対処
    todo.value[e.newIndex].order = todo.value[e.newIndex - 1].order + 1
    for (let i = e.oldIndex; i > e.newIndex; i--) {
      todo.value[i].order = todo.value[i].order + 1
    }
  } else if (e.oldIndex === 0) {
    // 一番上から一つ下にドラッグした時の対処
    todo.value[e.newIndex].order = todo.value[e.newIndex + 1].order - 1
    for (let i = e.oldIndex; i < e.newIndex; i++) {
      todo.value[i].order = todo.value[i].order + 1
    }
  } else {
    // それ以外の時の対処(既存のidを被らないようにする)
    if (e.newIndex > e.oldIndex) {
      for (let i = e.oldIndex; i < e.newIndex; i++) {
        // 連番の間に入った時の対処
        if (todo.value[i].order === todo.value[i + 1].order) {
          todo.value[i].order = todo.value[i].order + 1
        } else {
          todo.value[i].order = todo.value[i].order - 1
        }
        todo.value[e.newIndex].order = todo.value[e.newIndex - 1].order + 1
      }
    } else {
      for (let i = e.newIndex + 1; i < e.oldIndex + 1; i++) {
        // 連番の間に入った時の対処
        if (todo.value[i].order === todo.value[i + 1].order) {
          todo.value[i].order = todo.value[i].order - 1
        } else {
          todo.value[i].order = todo.value[i].order + 1
        }
        todo.value[e.newIndex].order = todo.value[e.newIndex + 1].order - 1
      }
    }
  }

  await deleteListBeforeOrderTodo(todo.value)
  await insertAndOrderTodo(todo.value)
}

const disableTextSelection = () => {
  document.addEventListener('selectstart', function (e) {
    e.preventDefault()
  })
}

onMounted(() => {
  getList()
  disableTextSelection()
})
</script>

<template>
  <div class="todoListWrapper">
    <div class="header">
      <h1>TODO LIST</h1>
      <RouterLink to="/work" class="changePage"> 仕事モードへ </RouterLink>
    </div>
    <div class="todoListAddArea" :class="{ active: displayFlag }">
      <div class="deleteBtn" @click="modalDisplay">
        <span></span>
        <span></span>
      </div>
      <h2>予定入力欄</h2>
      <div class="typeTodo">
        <p>やることを入力</p>
        <input v-model="todoItemText" type="text" placeholder="Add a new todo" />
      </div>
      <div class="selectData">
        <p>誰の予定？</p>
        <div class="selectRadioArea">
          <label v-for="data in selectData" :key="data" :for="data">
            <input v-model="todoItemWho" :id="data" type="radio" name="who" :value="data" />
            {{ data }}
          </label>
        </div>
      </div>
      <div class="selectData">
        <p>お仕事なのかい？</p>
        <div class="selectRadioArea">
          <label v-for="data in selectWorkData" :key="data" :for="data">
            <input v-model="todoItemWork" :id="data" type="radio" name="work" :value="data" />
            {{ data }}
          </label>
        </div>
      </div>
      <button
        :disabled="todoItemText === '' || todoItemWho === '' || todoItemWork === ''"
        @click="addList(todoItemText, todoItemWho, todoItemWork)"
      >
        予定を追加する
      </button>
    </div>
    <div class="overflow">
      <draggable
        class="todoListArea"
        :list="todo"
        item-key="id"
        :animation="200"
        :tag="'ul'"
        handle=".itemHandle"
        ghost-class="ghost-card"
        @end="dragEnd($event)"
      >
        <template #item="{ element }">
          <li :data="element.who">
            <div class="itemHandle">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="todoListAreaInner">
              <p v-if="element.who === 'tatsuru'">たつる</p>
              <p v-else-if="element.who === 'ayaka'">あやか</p>
              <p v-if="element.who === 'together'">ふたり</p>
              <span :class="{ done: element.isCompleted }">
                {{ element.title }}
              </span>
            </div>
            <div class="deleteBtn" @click="deleteItem(element.id)">
              <span></span>
              <span></span>
            </div>
          </li>
        </template>
      </draggable>
    </div>
    <div class="todoListAddStartBtn" @click="modalDisplay">
      <p>予定を追加する</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todoListWrapper {
  max-width: 600px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 100px 1fr 50px;
  // padding: 0 20px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    h1 {
      text-align: center;
      font-size: 40px;
      font-weight: bold;

      @media screen and (max-width: 767px) {
        font-size: 30px;
      }
    }

    .changePage {
      border: 0;
      background-color: #2465ca;
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

  .todoListAddArea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.88);
    z-index: 1000;
    padding: 0 calc(50% - 300px);
    display: none;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 767px) {
      padding: 20px;
    }

    .deleteBtn {
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

      span {
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

      span:last-child {
        top: 47%;
        transform: rotate(-45deg);
      }
    }

    h2 {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 40px;
    }

    .typeTodo {
      margin-bottom: 40px;

      p {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 10px;

        @media screen and (max-width: 767px) {
          font-size: 16px;
        }
      }

      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #7ea6da;
        border-radius: 5px;
        font-size: 16px;
      }
    }

    .selectData {
      margin-bottom: 40px;

      p {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 20px;

        @media screen and (max-width: 767px) {
          font-size: 16px;
        }
      }

      .selectRadioArea {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        label {
          display: flex;
          align-items: center;
          font-size: 16px;
          letter-spacing: 0.06em;
          color: #fff;

          input {
            margin-right: 10px;
            width: 20px;
            height: 20px;

            &:checked {
              background-color: #7ea6da;
            }
          }

          &:last-child {
            margin-right: 0;
            margin-bottom: 0;
          }
        }
      }
    }

    button {
      padding: 10px 20px;
      border: 1px solid #2465ca;
      border-radius: 5px;
      background-color: #2465ca;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      width: 100%;

      &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    &.active {
      display: flex;
    }
  }

  .overflow {
    overflow: scroll;
    // height: calc(100vh - 230px);
    height: 95%;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 30px;

    @media screen and (max-width: 767px) {
      // height: calc(100vh - 300px);
    }

    .todoListArea {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        gap: 10px;
        border-radius: 5px;
        padding: 10px 10px 10px 40px;
        position: relative;
        // user-select: none;

        .itemHandle {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          width: 20px;
          height: 10px;
          cursor: move;

          span {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #fff;
            border-radius: 5px;

            &:nth-child(2) {
              top: 50%;
              transform: translateY(-50%);
            }

            &:last-child {
              top: auto;
              bottom: 0;
            }
          }
        }

        .todoListAreaInner {
          p {
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

          span {
            width: calc(100% - 40px);
            font-size: 16px;
            color: #ffffff;
            font-weight: 600;

            @media screen and (max-width: 767px) {
              font-size: 14.5px;
            }

            &.done {
              text-decoration: line-through;
            }
          }
        }

        .deleteBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;

          span {
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

          span:last-child {
            top: 47%;
            transform: rotate(-45deg);
          }
        }

        &[data='tatsuru'] {
          background-color: #3cb371;
        }

        &[data='ayaka'] {
          background-color: #f06060;
        }

        &[data='together'] {
          background-color: #fd9f3a;
        }

        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
  }

  .todoListAddStartBtn {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    height: 50px;
    border-radius: 5px;
    background-color: #2465ca;

    @media screen and (max-width: 767px) {
      bottom: 20px;
    }

    p {
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

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
