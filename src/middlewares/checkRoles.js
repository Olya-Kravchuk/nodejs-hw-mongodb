import createHttpError from 'http-errors';
import { ROLES } from '../constants/index.js';
import { Contact } from '../db/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    if (roles.includes(ROLES.PERSON) && roles === ROLES.PERSON) {
      const { studentId } = req.params;
      if (!studentId) {
        next(createHttpError(403));
        return;
      }

      const student = await Contact.findOne({
        _id: studentId,
        parentId: user._id,
      });

      if (student) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
