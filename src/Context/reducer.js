const reducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        ...state,
        token: action.token,
      };
    case 'companyName':
      return {
        ...state,
        companyName: action.companyName,
      };

    case 'transaction':
      return {
        ...state,
        transaction: action.transaction,
      };

    case 'companyEmail':
      return {
        ...state,
        companyEmail: action.companyEmail,
      };
    case 'balance':
      return {
        ...state,
        balance: action.balance,
      };
    case 'TotalSell':
      return {
        ...state,
        TotalSell: action.TotalSell,
      };
    case 'amount':
      return {
        ...state,
        amount: action.amount,
      };
    case 'customer':
      return {
        ...state,
        customer: action.customer,
      };

    case 'topbuy':
      return {
        ...state,
        topbuy: action.topbuy,
      };
    default:
      return state;
  }
};
export default reducer;