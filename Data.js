export default class Data {
  baseUrl = 'http://localhost:8080';
  recordsPerPage = 8;

  constructor() {}

  async fetchTotalNumOfPages() {
    const response = await fetch(`${this.baseUrl}/bikes/size`);
    const json = await response.json();
    const result = json.size;
    return Math.ceil(Number(result) / this.recordsPerPage);
  }

  async fetchItems(page) {
    if (page < 1) return;
    const response = await fetch(
      `${this.baseUrl}/bikes?page=${page - 1}&size=${this.recordsPerPage}`
    );
    return await response.json();
  }

  async fetchPageInfo() {
    const response = await fetch(`${this.baseUrl}/shopinfo`);
    return await response.json();
  }
}
