const { Router } = require("express");
const router = Router();
const { Post, Delete, GetByFolderId, Put } = require('../controllers/UserController');

router.post('/', Post);
router.get('/', GetByFolderId);
router.put('/', Put);
router.delete('/', Delete);

module.exports = router;
