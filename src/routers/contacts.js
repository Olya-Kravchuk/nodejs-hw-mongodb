import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  validateMongoId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.put(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  validateMongoId('contactId'),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  validateMongoId('contactId'),
  ctrlWrapper(patchContactController),
);

export default router;
