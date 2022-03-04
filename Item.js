export default class Item {
  constructor(uuid, title, price, oldPrice, imgUrl) {
    this.uuid = uuid;
    this.title = title;
    this.price = price;
    this.oldPrice = oldPrice;
    this.imgUrl = imgUrl;
  }
}
