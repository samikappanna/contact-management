import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';
// @desc Get all contacts
// @route GET /api/contacts
// @access private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    if (!contacts) {
        res.status(404)
        throw new Error("No contacts found");
    }
    res.status(200).json(contacts);
})

// @desc Create contact
// @route POST /api/contacts
// @access private

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("Please fill all the fields");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(200).json(contact);
})

// @desc Get contact
// @route GET /api/contacts/:id
// @access private

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404)
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404)
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User doesn't have permission to update other user's contacts")
    }

    const updtatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updtatedContact);
})

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User doesn't have permission to delete other user's contacts")
    }
    await contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact);
})

export { getContacts, createContact, getContact, updateContact, deleteContact }