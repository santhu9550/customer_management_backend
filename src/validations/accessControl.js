const AccessControl = require('accesscontrol');

const ac = new AccessControl();

// *****Manager***********//
ac.grant('Manager').createAny('*');
ac.grant('Manager').deleteAny('*');
ac.grant('Manager').deleteAny('*');
ac.grant('Manager').readAny('*');
ac.grant('Manager').updateAny('*');

// *****Agent***********//
ac.grant('Agent').createAny('Customer');

module.exports = ac;
