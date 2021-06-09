const AccessControl = require('accesscontrol');

const ac = new AccessControl();

// *****Manager***********//
ac.grant('Manager').createAny('Agent').createAny('Customer');
ac.grant('Manager').deleteAny('Agent').deleteAny('Customer');
ac.grant('Manager').deleteAny('Agent').deleteAny('Customer');
ac.grant('Manager').readAny('Agent').readAny('Customer');
ac.grant('Manager').updateAny('Agent').updateAny('Customer');

// *****Agent***********//
ac.grant('Agent').createAny('Customer');
ac.grant('Agent').readAny('Customer');

module.exports = ac;
