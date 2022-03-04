import Item from './Item.js';
import Data from './Data.js';

export default class App {
  currentPage = 1;
  pageTotal;
  data;
  prevBtn;
  nextBtn;
  pageSpan;

  constructor() {
    this.pageSpan = document.getElementById('page');

    // pagination buttons & event listeners assigned
    this.prevBtn = document.getElementById('btn_prev');
    this.prevBtn.addEventListener('click', this.prevPage.bind(this));
    this.nextBtn = document.getElementById('btn_next');
    this.nextBtn.addEventListener('click', this.nextPage.bind(this));

    this.data = new Data();

    // load data to the page in parallel
    this.initParallel();
  }

  async initParallel() {
    const array = await Promise.allSettled([
      this.data.fetchPageInfo(),
      this.data.fetchItems(this.currentPage),
      this.data.fetchTotalNumOfPages(),
    ]);

    // handle promises (fulfilled or rejected)
    if (array[0].status === 'rejected') {
      document.body.innerHTML = 'Server error occured. Try again.';
    } else {
      //load page info
      this.loadPageInfo(array[0].value);
    }
    if (array[1].status === 'rejected') {
      showFetchErrorContainer();
    } else {
      // load items
      this.loadItems(array[1].value);
    }
    if (array[2].status === 'fulfilled') {
      // load pagination
      this.loadPagination(array[2].value);
    } else {
      // do nothing - pagination view will not load by default
    }
  }

  showFetchErrorContainer() {
    //error occured loading items - create & show error container
    document.getElementById('item-container').innerHTML = '';
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('alert');
    errorDiv.classList.add('alert-danger');
    errorDiv.innerText = 'Error occured. Try reloading the page.';
    document.getElementById('item-container').appendChild(errorDiv);

    // hide pagination
    document.getElementById('pagination').style.display = 'none';
  }

  prevPage(event) {
    if (this.currentPage - 1 >= 1) {
      this.currentPage--;
    }
    this.updatePaginationUI();

    // update view - load new items
    this.data
      .fetchItems(this.currentPage)
      .then(jsonData => this.loadItems(jsonData))
      .catch(err => showFetchErrorContainer());
  }

  nextPage(event) {
    if (this.currentPage + 1 <= this.pageTotal) {
      this.currentPage++;
    }
    this.updatePaginationUI();

    // update view - load new items
    this.data
      .fetchItems(this.currentPage)
      .then(jsonData => this.loadItems(jsonData))
      .catch(err => this.showFetchErrorContainer());
  }

  updatePaginationUI() {
    this.pageSpan.textContent = `${this.currentPage}/${this.pageTotal}`;
    if (this.currentPage === 1) {
      this.prevBtn.classList.add('disabled');
    }
    if (this.currentPage == this.pageTotal) {
      this.nextBtn.classList.add('disabled');
    }

    if (this.currentPage + 1 <= this.pageTotal) {
      this.nextBtn.classList.remove('disabled');
    }
    if (this.currentPage - 1 >= 1) {
      this.prevBtn.classList.remove('disabled');
    }
  }

  newItem(item, stars = 0, sale = false) {
    if (!item) return;
    const colDiv = document.createElement('div');
    colDiv.classList.add('col');
    colDiv.classList.add('mb-5');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.classList.add('h-100');

    let saleDiv = null;
    if (sale) {
      saleDiv = document.createElement('div');
      saleDiv.classList.add('badge');
      saleDiv.classList.add('bg-dark');
      saleDiv.classList.add('text-white');
      saleDiv.classList.add('position-absolute');
      saleDiv.style = 'top: 0.5rem; right: 0.5rem';
      saleDiv.textContent = 'Sale';
    }
    saleDiv && cardDiv.appendChild(saleDiv);

    const itemImg = document.createElement('img');
    itemImg.classList.add('card-img-top');
    itemImg.src = item.imgUrl;
    cardDiv.appendChild(itemImg);

    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.classList.add('card-body');
    productDetailsDiv.classList.add('p-4');

    const productDiv = document.createElement('div');
    productDiv.classList.add('text-center');
    const productNameH5 = document.createElement('h5');
    productNameH5.classList.add('fw-bolder');
    productNameH5.textContent = item.title;
    productDiv.appendChild(productNameH5);

    let productsReviews = null;
    if (stars > 0 && stars <= 5) {
      productsReviews = document.createElement('div');
      productsReviews.classList.add('d-flex');
      productsReviews.classList.add('justify-content-center');
      productsReviews.classList.add('small');
      productsReviews.classList.add('text-warning');
      productsReviews.classList.add('mb-2');
      for (let i = 0; i < stars; i++) {
        const star = document.createElement('div');
        star.classList.add('bi-star-fill');
        productsReviews.appendChild(star);
      }
    }
    productsReviews && productDiv.appendChild(productsReviews);

    let productPrice = null;
    if (sale) {
      productPrice = document.createElement('span');
      productPrice.classList.add('text-muted');
      productPrice.classList.add('text-decoration-line-through');
      productPrice.innerText = item.oldPrice + ' €';
    }
    productPrice && productDiv.appendChild(productPrice);

    const priceSpan = document.createElement('span');
    priceSpan.innerText = item.price + ' €';
    productDiv.appendChild(priceSpan);

    productDetailsDiv.appendChild(productDiv);

    const productActions = document.createElement('div');
    productActions.classList.add('card-footer');
    productActions.classList.add('p-4');
    productActions.classList.add('pt-0');
    productActions.classList.add('border-top-0');
    productActions.classList.add('bg-transparent');

    const productsActionsChild = document.createElement('div');
    productsActionsChild.classList.add('text-center');

    const productBtn = document.createElement('a');
    productBtn.classList.add('btn');
    productBtn.classList.add('btn-outline-dark');
    productBtn.classList.add('mt-auto');
    productBtn.href = `#/items/${item.uuid}`;
    productBtn.innerText = 'Add to cart';
    productsActionsChild.appendChild(productBtn);

    productActions.appendChild(productsActionsChild);
    productDetailsDiv.appendChild(productActions);

    cardDiv.appendChild(productDetailsDiv);

    colDiv.appendChild(cardDiv);

    document.getElementById('item-container').appendChild(colDiv);
  }

  loadItems(jsonData) {
    //empty items container
    document.getElementById('item-container').innerHTML = '';

    jsonData.forEach(jsonItem => {
      if (!jsonItem.uuid) return;
      // make Item object & push to itemObjs
      const oldPrice =
        jsonItem.oldPrice === 'null' ? null : Number(jsonItem.oldPrice);
      const tempItem = new Item(
        jsonItem.uuid,
        jsonItem.title,
        Number(jsonItem.price),
        oldPrice,
        jsonItem.imgUrl
      );
      if (tempItem.oldPrice) this.newItem(tempItem, 0, true);
      else this.newItem(tempItem, 0, false);
    });
  }

  loadPageInfo(data) {
    const header = document.getElementById('header');
    const navbarText = document.querySelector('.navbar-brand');
    const shopTitle = document.getElementById('shop-title');
    const shopDescription = document.getElementById('shop-description');
    const copyrightData = document.getElementById('copyright');

    navbarText.textContent = data.badge || 'Shop badge';
    shopTitle.textContent = data.title || 'Shop in style';
    shopDescription.textContent =
      data.description || 'With this shop homepage template';
    header.style.backgroundImage = `url('${data.titleImage}')`;
    copyrightData.textContent = data.copyright + ' ' + new Date().getFullYear();
  }

  loadPagination(pageTotal) {
    const pagination = document.getElementById('pagination');
    // change span how many pages & current page
    pagination.style.display = 'block';
    // set total pages
    this.pageTotal = pageTotal;

    this.prevPage();
  }
}

new App();
