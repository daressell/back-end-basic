// import fs from "fs"
import { Router } from "express"
const router = Router()

import("../controllers/item/items.get.js").then((module) => {
  router.get("/items", module.default)
})
import("../controllers/item/item.post.js").then((module) => {
  router.post("/item", module.default)
})
import("../controllers/item/item.patch.js").then((module) => {
  router.patch("/item/:uuid", module.default)
})
import("../controllers/item/item.delete.js").then((module) => {
  router.delete("/item/:uuid", module.default)
})

// const pathToCpontrollers = "./controllers"
// const folders = fs.readdirSync(pathToCpontrollers)
// folders.map((folder) => {
//   fs.readdirSync(`${pathToCpontrollers}/${folder}`).map((file) => {
//     import(`.${pathToCpontrollers}/${folder}/${file}`).then((module) => {
//       const data = file.split(".")
//       if (data[1] === "delete" || data[1] === "patch" || data[1] === "put") {
//         data[0] += "/:uuid"
//       }
//       if (data[1] === "get" && data[0][data[0].length - 1] !== "s") {
//         data[0] += "/:uuid"
//       }
//       router[data[1]](`/${data[0]}`, module.default)
//     })
//   })
// })

// import createTodo from "../controllers/item/item.post.js"

// router.post("/todo", createTodo)

export default router
