import { defineStore } from 'pinia'

interface UserDetail {
  id: number;
  src: string;
  name?: string;
  occupation?: string;
  application_deadline?: string;
  status?: string;
  ability_data: number[]
}

export const userDetailStore = defineStore('userDetailStore', {

  state: () => {
    return {
      activeDetail: false as boolean,
      UserDetail: {} as UserDetail[],
      userIndividual: {} as UserDetail
    }
  },

  actions: {
    openDetail(id : number) {
      this.activeDetail = true
      this.userIndividual = this.UserDetail[id - 1]
    },
    closeDetail() {
      this.activeDetail = false
    },
    setData(data: UserDetail[]) {
      this.UserDetail = data
    }
  },
})
