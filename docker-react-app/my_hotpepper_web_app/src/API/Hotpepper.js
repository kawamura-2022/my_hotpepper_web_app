import ApiClient from '../API/API_Client';

const client = new ApiClient();

class HotpepperApi {

    static async getNearRestaurant(params) {
      // const endpoint = '/api/call_hotpepper';
      const endpoint = '/hotpepper/gourmet/v1/';
    
      // const endpoint = process.env.REACT_APP_API_URL_HOTPEPPER;

      try {        
        return await client.request('GET', endpoint, params);
      } catch (e) {
        console.log('エラー(Hotpepper のAPI内):', e);
        return {data: ['error in HotpepperApi', params, endpoint]};
      }
    }
  }

export default HotpepperApi;
