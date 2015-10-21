'use strict';

describe('Service: MeetingProposal', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var MeetingProposal;
  beforeEach(inject(function (_MeetingProposal_) {
    MeetingProposal = _MeetingProposal_;
  }));

  it('should do something', function () {
    expect(!!MeetingProposal).toBe(true);
  });

});
