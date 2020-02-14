import produce from 'immer';

// when dispatch is call, all reducer are activated
// every reducer receive state and action
// initialize state empty
export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      // produce in immer allows to make a copy of state tha can be change - see bellow
      // draft is the copy of state
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
