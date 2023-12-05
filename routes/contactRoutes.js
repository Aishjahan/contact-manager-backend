const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  getContactById,
  deleteContact,
  updateContactById,
} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken);
router.route("/").get(getContact).post(createContact);

router
  .route("/:id")
  .put(updateContactById)
  .delete(deleteContact)
  .get(getContactById);

module.exports = router;
