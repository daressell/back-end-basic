const express = require("express")
const router = express.Router()

const getItems = require("../controllers/item/items.get")
const createItem = require("../controllers/item/item.post")
const putItem = require("../controllers/item/item.put")
const deleteItem = require("../controllers/item/item.delete")

router.get("/items", getItems)
router.post("/item", createItem)
router.put("/item/:uuid", putItem)
router.delete("/item/:uuid", deleteItem)

module.exports = router
