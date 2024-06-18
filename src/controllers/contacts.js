import mongoose from 'mongoose';
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const personId = req.user._id;

  const contacts = await getAllContacts({
    personId,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const personId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    res.status(404).json({
      message: 'Not found',
    });
    return;
  }
  const contact = await getContactById({ contactId, personId });
  if (!contact) {
    // return res.status(404).json({
    //   status: 404,
    //   message: `Contact with id ${contactId} not found!`,
    // });
    next(createHttpError(404, `Contact with id ${contactId} not found!`));
    return;
  }
  res.status(200).json({
    status: res.statusCode,
    message: `Successfully found contact with id: ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const personId = req.user._id;
  if (!req.body.name || !req.body.phoneNumber) {
    return res.status(400).json({
      status: 400,
      message: 'Name and phoneNumber are required fields.',
    });
  }
  const contact = await createContact(req.body, personId);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const personId = req.user._id;
  const contact = await deleteContact({ contactId, personId });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const personId = req.user._id;
  const result = await updateContact({ contactId, personId }, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const personId = req.user._id;
  const result = await updateContact({ contactId, personId }, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
