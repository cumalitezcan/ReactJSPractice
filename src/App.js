import React, { Component } from 'react'
import Navi from './Navi';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import { Container, Row, Col } from 'reactstrap';
import alertify from "alertifyjs";
import { Switch, Route } from 'react-router-dom'
import NotFound from './NotFound';
import CartList from './CartList';
import FormDemo1 from './FormDemo1';
import FormDemo2 from './FormDemo2';

export default class App extends Component {

  state = { currentCategory: "", products: [], cart: [] }

  componentDidMount() {
    this.getProducts();
  }


  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  }

  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + "added to cart", 2);
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id)
    this.setState({ cart: newCart })
    alertify.error(product.productName + "removed from cart", 2);
  }

  render() {
    let categoryInfo = { title: "Category List" }
    let productInfo = { title: "Product List" }
   
    return (
      <div>
        <Container>

          <Navi cart={this.state.cart} removeFromCart={this.removeFromCart} />

          <Row>
            <Col xs="3"> <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={categoryInfo} /> </Col>

            <Switch>
              <Route exact path="/" render={
                props => (
                  <Col xs="9"> <ProductList {...props} products={this.state.products} addToCart={this.addToCart} currentCategory={this.state.currentCategory} info={productInfo} /> </Col>
                )
              } />
              <Route exact path="/cart" render={
                props => (
                  <Col xs="9"> <CartList {...props} cart={this.state.cart} removeFromCart={this.removeFromCart}  /> </Col>
                )
              } />
                <Route path="/form1" component={FormDemo1} ></Route>
                <Route path="/form2" component={FormDemo2} ></Route>
              <Route component={NotFound} />
            </Switch>

          </Row>
        </Container>
      </div>
    );
  }
}




