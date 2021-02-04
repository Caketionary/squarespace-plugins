import getDateAfter from './date';

const validatePhone = (phone) => phone.match(/^\+?[\d-]+$/);

const validateDate = (date) => date.match(/^[\d]{4}-[\d]{2}-[\d]{2}$/);

const validateDateAfter = (date, d) => {
  const compareDate = getDateAfter(d);

  console.log([date, compareDate]);

  return date >= compareDate;
};

export default {
  validatePhone,
  validateDate,
  validateDateAfter,
};
