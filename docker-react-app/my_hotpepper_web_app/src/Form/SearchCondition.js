
  export default class SearchCondition {
    constructor(latm = null, lng = null, range = null, party_capacity = null, count = null) {            
      this.latm = latm;
      this.lng = lng;
      this.range = range;
      this.party_capacity = party_capacity;
      this.count = count;
      this.api_key_hotpepper = process.env.REACT_APP_API_KEY_HOTPEPPER;
    }
    // 初期値をフォームに入れる
    toForm() {      
      return {
        range: "3",
        party_capacity: "1" ,
        count : "25"       
      };
    }
    toAPI() {
      return {
        lat: this.latm,
        lng: this.lng,
        range: this.range,
        party_capacity: this.party_capacity,
        count: this.count,
        key: this.api_key_hotpepper
      };
    }
    static fromForm({ latm, lng, range, party_capacity, count }) {
      return new SearchCondition(
        latm,
        lng,
        range,
        party_capacity,
        count
      );
    }    

    static get_rangeCandidates() {
      return [
        { label: `300m`, value: `1` },
        { label: `500m`, value: `2` },
        { label: `1000m`, value: `3` },
        { label: `2000m`, value: `4` },
        { label: `3000m`, value: `5` }
      ];
    }
  }