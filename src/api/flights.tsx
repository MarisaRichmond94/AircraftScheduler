import BaseApi from 'api/base';

class Flights extends BaseApi {
  constructor() {
    super('flights');
  };
};

const FlightsApi = new Flights();
export default FlightsApi;
