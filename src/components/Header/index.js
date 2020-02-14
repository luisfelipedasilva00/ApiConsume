import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.png';

export default function Header() {
  const cartSize = useSelector(state => state.cart.length)

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="BuyShoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

// connect received state with information of component (Reducer)
// every reducer can be accessed in state
// When change state component is render
/*
// coment after use useSelector instead of connect from redux

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
*/
