<script setup>
// import { NUpload, NUploadDragger } from "naive-ui"

// const picType = ref("")

const test1 = async () => {
  const { data, pending, error, refresh } = await useFetch("/api/poppler", {
    method: "POST",
  })
}

const checkFileType = (files) => {
  return files.filter((file) => file.type === "application/pdf")
}
</script>

<template lang="pug">
.home
  Upload

</template>

<style lang="stylus">
.home
  // flexCenter(flex-atart,,column)
  position relative
  size(,100vh)
</style>
