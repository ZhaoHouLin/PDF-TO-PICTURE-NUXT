<script setup>
import IconFilePdfVue from "./icons/IconFilePdf.vue"
import IconGeneratePdf from "./icons/IconGeneratePdf.vue"
import IconFilePdf from "./icons/IconFilePdf.vue"

const formData = ref(null)

const fileName = ref("")

const isPdf = ref(false)

const transferData = reactive({
  beginPage: 1,
  endPage: 0,
  picType: "png",
  // fileName: "good",
})

const chooseFile = (e) => {
  const files = e.target.files
  fileName.value = files[0].name
  if (files[0].type === "application/pdf") {
    formData.value = new FormData()
    formData.value.append(files[0].name, files[0])
    isPdf.value = true
  } else {
    alert("請選擇pdf檔")
    fileName.value = ""
  }
}

const handleFile = async () => {
  if (isPdf.value) {
    formData.value.append("beginPage", transferData.beginPage)
    formData.value.append("endPage", transferData.endPage)
    formData.value.append("picType", transferData.picType)

    const { data, pending, error, refresh } = await useFetch("/api/poppler", {
      method: "post",
      body: formData.value,
      // query: transferData,
    })
    if (data.value) {
      isPdf.value = false
      formData.value = ""
      fileName.value = "轉換完成!"
      alert("請至 OutputData資料夾 查看結果")
    }
    // console.log(data.value)
  }
}

const outputPath = ref()
</script>

<template lang="pug">
.upload
  .title PDF To PICTURE
  .content
    input#choose-file(type='file' name='file' @input='chooseFile')
    IconFilePdf
  .file-name {{fileName}}  
  .options
    //- .option.output-path
      label(for='outputPath')
      input(type='file' id='outputPath' name='file' ref='outputPath'  @change='getSelectedPath' directory)
      button(@click='getSelectedPath') 輸出路徑
    .option.begin-page
      label(for='beginPage') 轉換起始頁面
      input(type='number' id='beginPage' name='beginPage' v-model='transferData.beginPage')
    .option.endpage
      label(for='endPage') 轉換結束頁面
      input(type='number' id='endPage' name='endPage' v-model='transferData.endPage')
    .option.pic-type
      label(for='picType') 請選擇輸出類型
      select(v-model="transferData.picType" id='picType')
        option(value='jpg') jpg
        option(value='png') png
  button(type='submit' @click='handleFile') Transfer File
</template>

<style lang="stylus" scoped>

screenWidth = 360px

.upload
  pos()
  transform translate(-50%,-50%)
  size()
  flexCenter(,,column)
  // border 1px solid #000
  .title
    box-sizing border-box
    padding 0.5rem
    font-size 1.2rem
    color colorPrimary
  .content
    size(screenWidth,50%)
    flexCenter()
    position relative
    border 1px dashed colorPrimary
    padding 1rem
    box-sizing border-box
    margin-bottom 1rem

    #choose-file
      position absolute
      size()
      opacity 0
      z-index 2
      cursor pointer
    svg
      color colorPrimary
      size(60%)
      pos()
      transform translate(-50%,-50%)
  .file-name
    size(screenWidth,2rem)
    text-align center
    flexCenter()
    border-bottom 1px solid colorPrimary
    font-size 0.8rem
    padding 0.5rem 1rem
    box-sizing border-box
    margin-bottom 1rem
  .options
    color colorPrimary
    size(screenWidth,auto)
    flexCenter(,,column)
    margin-bottom 1rem
    .option
      size(,auto)
      flexCenter(space-between)
      margin-bottom 1rem
      input,select
        text-align center
        border 1px solid colorPrimary
        box-sizing border-box
        width 200px
        padding 2px
      // border 1px solid #000
  button
    width screenWidth

.option.endpage
  position relative
  &:hover
    &:before
      opacity 1
  &:before
    opacity 0
    transition .5s ease
    background-color #222
    color #fff
    padding 2px 8px
    border-radius 4px
    content '預設0為每一頁都轉換'
    font-size 0.8rem
    position absolute
    // top 1.2rem
</style>
