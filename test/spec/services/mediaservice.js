'use strict';

describe('Service: mediaService', function () {

  // load the service's module
  beforeEach(module('filmikApp'));

  // instantiate service
  var mediaService;
  beforeEach(inject(function (_mediaService_) {
    mediaService = _mediaService_;
  }));

  it('should do something', function () {
    expect(!!mediaService).toBe(true);
  });

});
