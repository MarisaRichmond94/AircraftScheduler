import axios from 'axios';

import { settings } from 'settings';

class BaseApi {
  route;
  url;
  constructor(route: string) {
    this.url = `${settings.BASE_SERVER_URL}/${route}`;
    this.route = route;
  };

  async get() {
    let response;

    try {
      response = await axios.get(
        this.url,
        { headers: { 'Access-Control-Allow-Credentials': true } },
      );
    } catch (error) {
      console.log('We should really handle this...')
    }
    return this.handleResponse(response);
  };

  handleResponse = (response: any) => {
    if (response?.data) {
      return response.data;
    }
    console.log('This should definitely be handled...');
  };
};

export default BaseApi;
