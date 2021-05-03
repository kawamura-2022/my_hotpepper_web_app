import ApiClient from '../API/API_Client';

const client = new ApiClient();

class HotpepperApi {

    static async getNearRestaurant(params) {      
      const endpoint = '/hotpepper/gourmet/v1/';

      try {        
        return await client.request('GET', endpoint, params);
      } catch (e) {
        console.log('エラー(Hotpepper のAPI内):', e);
        return {data: ['error in HotpepperApi', params, endpoint]};
      }
    }
  }

export default HotpepperApi;
