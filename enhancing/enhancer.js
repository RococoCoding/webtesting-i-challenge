module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  if (item.enhancement < 20) {
    return { ...item, enhancement: item.enhancement + 1 };
  } else {
    return { ...item };
  }
}

function fail(item) {
  let newDurability = item.durability;
  let newEnhancement = item.enhancement;
  if (item.enhancement < 15) {
    newDurability = item.durability - 5;
  } else {
    newDurability = item.durability - 10;
  }
  if (item.enhancement > 16) {
    newEnhancement = item.enhancement - 1;
  }
  return { ...item, durability: newDurability, enhancement: newEnhancement };
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
