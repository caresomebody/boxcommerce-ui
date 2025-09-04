function generateRandomPhone() {
  const prefix = "85";
  const digits = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return prefix + digits;
}

function generateRandomEmail() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `user_${timestamp}_${random}@testmail.com`;
}

module.exports = {
  generateRandomPhone,
  generateRandomEmail,
};
