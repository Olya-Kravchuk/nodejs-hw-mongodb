import { SORT_ORDER } from '../constants/index.js';
import { Contact } from '../db/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  personId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find(personId);

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  // const contactsCount = await Contact.find()
  //   .merge(contactsQuery)
  //   .countDocuments();

  // const contacts = await contactsQuery
  //   .skip(skip)
  //   .limit(limit)
  //   .sort({ [sortBy]: sortOrder })
  //   .exec();

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, personId) => {
  const contact = await Contact.findOne(contactId, personId);
  return contact;
};

export const createContact = async (payload, personId) => {
  const contact = await Contact.create(payload, personId);
  return contact;
};

export const deleteContact = async (contactId, personId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    personId,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  personId,
  options = {},
) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId, personId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
