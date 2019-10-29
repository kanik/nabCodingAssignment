export const textRequired = value => {
  if (!value) return "Required";
};

export const checkboxRequired = value => {
  if (!value) return "Required";
};

export const addressValidation = value => {
  if (!value) return;
  if (value.length > 50) return "address has to be 50 or less characters";
};

export const descriptionValidation = value => {
  if (!value) return ;
  if (value.length > 200 || value.length < 10)
    return "minimum of 10 and maximum of 200 characters";
};

export const selectValidation = value => {
  if (!value) return "Required";
  if (value === "Select one") return "Required";
};
