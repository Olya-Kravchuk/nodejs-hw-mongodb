const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return null;

  const validContactTypes = ['work', 'home', 'personal'];
  return validContactTypes.includes(contactType) ? contactType : null;
  // const isContactType = (contactType) =>
  //   ['work', 'home', 'personal'].includes(contactType);

  // return isContactType(contactType) ? contactType : null;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return null;

  // const validFavouriteValues = ['true', 'false'];
  // if (validFavouriteValues.includes(isFavourite.toLowerCase())) {
  //   return isFavourite.toLowerCase() === 'true';
  // }

  const lowerCasedValue = isFavourite.toLowerCase();
  if (lowerCasedValue === 'true') {
    return true;
  } else if (lowerCasedValue === 'false') {
    return false;
  }

  return null;
  //  const hasFavourite = (isFavourite) =>
  //    ['true', 'false'].includes(isFavourite.toLowerCase());

  //  if (hasFavourite(isFavourite)) {
  //    return isFavourite.toLowerCase() === 'true';
  //  }

  //  return null;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  // const parsedContactType = parseContactType(contactType);
  // const parsedIsFavourite = parseIsFavourite(isFavourite);

  // return {
  //   contactType: parsedContactType,
  //   isFavourite: parsedIsFavourite,
  // };

  return {
    contactType: parseContactType(contactType),
    isFavourite: parseIsFavourite(isFavourite),
  };
};
