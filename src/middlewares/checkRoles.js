// import createHttpError from 'http-errors';
// import { ROLES } from '../constants/index.js';
// import { Contact } from '../db/contact.js';

// export const checkRoles =
//   (...roles) =>
//   async (req, res, next) => {
//     const { user } = req;
//     if (!user) {
//       next(createHttpError(401));
//       return;
//     }

//     if (roles.includes(ROLES.PERSON) && roles === ROLES.PERSON) {
//       const { contactId } = req.params;
//       if (!contactId) {
//         next(createHttpError(403));
//         return;
//       }

//       const contact = await Contact.findOne({
//         _id: contactId,
//         parentId: user._id,
//       });

//       if (contact) {
//         next();
//         return;
//       }
//     }

//     next(createHttpError(403));
//   };
