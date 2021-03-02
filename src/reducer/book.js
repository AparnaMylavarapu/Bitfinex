import {BidData, AskData, PriceData} from '../constants/index';

const initState = {
    bidData: [],
    askData: [],
    priceWithTotal: {}
}

 const book = (state = initState, action) => {
    switch (action.type) {
      case BidData:
        return {...state, bidData: [...state.bidData, ...action.payload]}
        case AskData:
        return {...state, askData: [...state.askData, ...action.payload]}
        case PriceData:
        return {...state, priceWithTotal: action.payload}
      default:
        return state
    }
  }

  export default book;