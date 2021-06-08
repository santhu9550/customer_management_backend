/**
 * Check if two objectIds are same or not
 * @param {ObjectId} id1 - first id
 * @param {ObjectId} id2 - second id
 */

const isSameObjectId = (id1, id2) => String(id1) === String(id2);

module.exports = {
  isSameObjectId
};
