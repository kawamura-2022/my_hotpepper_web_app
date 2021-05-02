

  export default class SearchCondition {
    constructor(latm = null, lng = null, tgt_range = null, party_capacity = null) {
      this.latm = latm;
      this.lng = lng;
      this.tgt_range = tgt_range;
      this.party_capacity = party_capacity;      
    }
    // 初期値をフォームに入れる
    toForm() {      
      return {
        tgt_range: "1000",
        party_capacity: "0"
      };
    }
    toAPI() {
      return {
        lat: this.latm,
        lng: this.lng,
        tgt_range: this.tgt_range,
        party_capacity: this.party_capacity
      };
    }
    static fromForm({ latm, lng, tgt_range, party_capacity }) {
      return new SearchCondition(
        latm,
        lng,
        tgt_range,
        party_capacity
      );
    }    

    static get_rangeCandidates() {
      return [
        { label: `300m`, value: `300` },
        { label: `500m`, value: `500` },
        { label: `1000m`, value: `1000` },
        { label: `2000m`, value: `2000` },
        { label: `3000m`, value: `3000` }
      ];
    }
  }
  