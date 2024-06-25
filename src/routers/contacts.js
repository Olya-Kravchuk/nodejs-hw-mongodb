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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
// import { checkRoles } from '../middlewares/checkRoles.js';
// import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  // checkRoles(ROLES.PERSON),
  validateMongoId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  // checkRoles(ROLES.PERSON),
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  // checkRoles(ROLES.PERSON),
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:contactId',
  // checkRoles(ROLES.PERSON),
  upload.single('photo'),
  validateBody(updateContactSchema),
  validateMongoId('contactId'),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  // checkRoles(ROLES.PERSON),
  upload.single('photo'),
  validateBody(updateContactSchema),
  validateMongoId('contactId'),
  ctrlWrapper(patchContactController),
);

export default router;
