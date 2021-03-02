const initState = {
    bidData: [],
    askData: [],
    priceWithTotal: {}
}

 const book = (state = initState, action) => {
    switch (action.type) {
      case 'BID_DATA':
        return {...state, bidData: [...state.bidData, ...action.payload]}
        case 'ASK_DATA':
        return {...state, askData: [...state.askData, ...action.payload]}
        case 'PRICE_DATA':
        return {...state, priceWithTotal: action.payload}
      default:
        return state
    }
  }

  export default book;