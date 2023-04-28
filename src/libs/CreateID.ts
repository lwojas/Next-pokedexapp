const CreateID = function () {
  let randomNum =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return randomNum;
};
export default CreateID;
