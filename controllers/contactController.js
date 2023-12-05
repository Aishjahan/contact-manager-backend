const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc - Get all Contacts
//@route - GET /api/contacts
//@access - private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});
//@desc - create new Contacts
//@route - POST /api/contacts
//@access - private
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All feilds are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id : req.user.id,
  });
  res.status(201).json(contact);
});
//@desc - Get Contact by id
//@route - GET /api/contacts/:id
//@access - private
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});
//@desc - delete Contact
//@route - DELETE /api/contacts/:id
//@access - private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(404);
    throw new Error('User Not authorized to perform this action');
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});
//@desc - update Contact
//@route - PUT /api/contacts/:id
//@access - private
const updateContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(404);
    throw new Error('User Not authorized to perform this action');
  }
  const uddatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(uddatedContact);
});

module.exports = {
  getContact,
  createContact,
  getContactById,
  deleteContact,
  updateContactById,
};
