const { Router } = require("express");
const { Put, GetByFolderId, Delete, Post } = require("../controllers/EntityController");
const router = Router();

router.post('/', Post);
router.get('/', GetByFolderId);
router.put('/', Put);
router.delete('/', Delete);

module.exports = router;
