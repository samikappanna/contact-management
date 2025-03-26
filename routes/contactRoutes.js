import express from "express";
import { Router } from "express";
import { deleteContact,getContacts,updateContact,getContact,createContact } from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";


const router = Router();

router.use(validateToken);
    
router.route('/').get(getContacts).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

export default router;