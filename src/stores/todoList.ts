import { defineStore } from "pinia";

type TODO = {
  id: number;
  label: string;
  finished: boolean;
};

export const useTodoStore = defineStore("todoList", {
  state: () => {
    return {
      todos: [] as TODO[],
    };
  },
  getters: {
  },
  actions: {
    addTodo() {
      console.log("addTodo");
    }
  },
});
