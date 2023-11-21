
import * as fs from 'node:fs'
import { exec } from 'child_process'
import { Poppler } from 'node-poppler'
import formidable from "formidable"


export default defineEventHandler(async (event) => {


  const outputFolder = '.\\OutputData\\'

  // const query = getQuery(event)


  const transfer = async (inputPath, outputPath, picType, beginPage = 1, endPage = 0) => {

    const poppler = new Poppler()

    const options = {
      firstPageToConvert: beginPage,
      lastPageToConvert: endPage,
      pngFile: picType == 'png',
      jpegFile: picType == 'jpg'
    }

    await poppler.pdfToCairo(inputPath, outputPath, options).then((res) => {

    }).catch((err) => {
      console.error(err)
      throw err
    })

  }

  const openFolder = () => {
    exec(`start ${outputFolder}`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error:', err)
        return
      }
      // console.log('stdout:', stdout)
      // console.error('stderr:', stderr)
    })
  }

  const form = formidable({ multiples: true })

  const [fields, files] = await form.parse(event.node.req)

  for (let file in files) {

    const oldPath = files[file][0].filepath
    const fileName = `./OutputData/result`

    const beginPage = parseInt(fields.beginPage[0])
    const endPage = parseInt(fields.endPage[0])
    // console.log(beginPage, endPage)

    await transfer(oldPath, fileName, fields.picType[0], beginPage, endPage)
    // fs.rename(files[file][0].filepath, fileName, (err) => console.log(err))
  }

  openFolder()

  return {
    message: 'success',
  }

})


