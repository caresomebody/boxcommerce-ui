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

function generateRandomName() {
  const names = [
    "James", "Riyadi", "Bruce", "Sarah", "John",
    "Maria", "David", "Siti", "Budi", "Lina"
  ];
  const index = Math.floor(Math.random() * names.length);
  return names[index];
}

function generateRandomStoreName() {
    const suffix = "Store";
  const names = [
    "Berkah", "Jaya", "Cool", "Big", "Nice",
    "Cheap", "Rich", "Smart", "Mart", "Toko"
  ];
  const index = Math.floor(Math.random() * names.length);
  const randomNum = Math.floor(Math.random() * 1000);
  return `${names[index]}${suffix}${randomNum}`;
}


function generateRandomUsername() {
  const name = generateRandomName();
  const number = Math.floor(1000 + Math.random() * 9000); // 4-digit
  return `${name.toLowerCase()}${number}`;
}

function generateRandomString(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

module.exports = {
  generateRandomPhone,
  generateRandomEmail,
  generateRandomName,
  generateRandomStoreName,
  generateRandomUsername,
  generateRandomString,
};
