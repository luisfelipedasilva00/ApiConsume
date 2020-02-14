import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';
import { ProductList } from './styles';

function Home({amount, addToCartRequest}) {
  const [products, setProducts] = useState([]);

  // replace componentDidMount
  useEffect (() => {
    async function loadProducts() {
      const response = await api.get('products');

      // create format price to execute one time, intead of in render that will be execute many times - good practices to avoid unnecessary processing
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []) //to execute only one time - no monitore anyone status

  // every component that connect with redux receive the dispatch property in props
  function handleAddProduct (id) {
    /* const { dispatch } = this.props;
    dispatch(CartActions.addToCart(product)); */

    // after use const mapDispatchToProps, code is like that
    addToCartRequest(id);
  };

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />{' '}
                {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }


const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

// convert actions of a reducer in props
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

// connect component with redux state
export default connect(mapStateToProps, mapDispatchToProps)(Home);
