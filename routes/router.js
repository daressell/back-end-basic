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

export default router
