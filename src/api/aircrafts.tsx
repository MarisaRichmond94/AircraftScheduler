import BaseApi from 'api/base';

class Aircrafts extends BaseApi {
  constructor() {
    super('aircrafts');
  };
};

const AircraftsApi = new Aircrafts();
export default AircraftsApi;
