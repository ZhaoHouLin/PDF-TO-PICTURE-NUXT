import { defineStore } from "pinia"
export const useCounterStore = defineStore("counter", () => {
  const isPng = ref(false)

  const outputPicType = (bool) => {
    isPng.value = bool
  }

  return {
    isPng,
    outputPicType
  }
})
