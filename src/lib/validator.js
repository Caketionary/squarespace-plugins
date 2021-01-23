const validatePhone = (phone) => phone.match(/^\+?[\d-]+$/);
const validateDate = (date) => date.match(/^[\d]{4}-[\d]{2}-[\d]{2}$/);

export default {
  validatePhone,
  validateDate,
};
