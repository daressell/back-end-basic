import fs from "fs"
import { Router } from "express"
const router = Router()

const pathToCpontrollers = "./controllers"
const folders = fs.readdirSync(pathToCpontrollers)
folders.map((folder) => {
  fs.readdirSync(`${pathToCpontrollers}/${folder}`).map((file) => {
    import(`.${pathToCpontrollers}/${folder}/${file}`).then((module) => {
      const type = file.split(".")[1]
      router[type]("/todo", module.default)
    })
  })
})

export default router
