export const calculateProfileCompletion = (user: any) => {
  let completed = 0;
  let total = 16;
  // Personal Data
  for (let key in user) {
    if (
      key == "email" ||
      key == "phoneNumber" ||
      key == "fullName" ||
      key == "username" ||
      key == "bio" ||
      key == "country" ||
      key == "state" ||
      key == "city"
    ) {
      if (Array.isArray(user[key]) && user[key].length !== 0) {
        completed++;
      } else if (
        user[key] !== null &&
        user[key] !== undefined &&
        user[key] !== ""
      ) {
        completed++;
      }
    }
  }
  // Professional Data
  for (let key in user) {
    if (
      key == "title" ||
      key == "charges" ||
      key == "categories" ||
      key == "subCategories" ||
      key == "languagesSpoken" ||
      key == "stripeAccountId"
    ) {
      if (Array.isArray(user[key])) {
        if (user[key].length !== 0) completed++;
      } else if (
        user[key] !== null &&
        user[key] !== undefined &&
        user[key] !== ""
      ) {
        completed++;
      }
    }
  }
  const percentage = (completed / total) * 100;
  return Math.round(percentage);
};
