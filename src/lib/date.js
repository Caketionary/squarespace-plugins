const getDateAfter = (d) => {
  const date = new Date();
  date.setDate(date.getDate() + d);

  return date.toISOString().slice(0, 10);
};

export default getDateAfter;
