import React from 'react';
import Bids from './OrderBook/Bids';
import Asks from './OrderBook/Asks';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        bidData: state.bidData,
        askData: state.askData,
        priceWithTotal: state.priceWithTotal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}

class Home extends React.Component {

 componentDidMount() {
    let bData = [];
    let aData = [];
    let prcWithTotal = {bid: {}, ask: {}};
    const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2') // Create new Websocket
    let msg = JSON.stringify({ 
        event: 'subscribe', 
        channel: 'book', 
        symbol: 'tBTCUSD' 
      });
      
    wss.onopen = () => {
        wss.send(msg);
        console.log('yes');
    };
    wss.onmessage = (msg) => {
        const finalMsg = JSON.parse(msg.data);
        let price = null;
        let count = null;
        let amount = null;
        let type = null; 
        
        if(finalMsg && finalMsg.length > 0) {
            price = finalMsg[1][0];
            count = finalMsg[1][1];
            amount = finalMsg[1][2];
            amount = amount.toString();
            amount = parseFloat(amount).toFixed(3);
            /* If amount is greater than 0 its a bid if not ask */
             type = amount > 0 ? 'bid' : 'ask';
            if( count > 0 && (amount !== 1 || amount !== -1)) {
                if(amount < 0) {
                    amount  = amount * (-1);
                }
                if( !prcWithTotal[type][price+'$']) {
                    prcWithTotal[type][price+'$'] = +amount;
                    this.props.dispatch({
                        type: 'PRICE_DATA',
                        payload: prcWithTotal
                    });
                } else {
                    prcWithTotal[type][price+'$'] += +amount;
                    this.props.dispatch({
                        type: 'PRICE_DATA',
                        payload: prcWithTotal
                    });
                }
                if( type === 'bid') {
                    bData.unshift({
                        price,
                        count,
                        amount,
                        time:new Date()
                    });
                    this.props.dispatch({
                        type: 'BID_DATA',
                        payload: bData
                    });
                } else {
                    aData.unshift({
                        price,
                        count,
                        amount: amount,
                        time:new Date()
                    });
                    this.props.dispatch({
                        type: 'ASK_DATA',
                        payload: aData
                    });
                }
            }
        }
    }
    setTimeout(() =>{
        console.log('closing...');
        wss.close();
        console.log('closed...');
    }, 60000);
 }
 render() {
     return(
        <>
            <div className="chart-container">
                <div className="bid-side">
                    {this.props.bidData.length > 0 ? 
                        <Bids></Bids>
                    : null} 
                </div>
                <div className="ask-side">
                    {this.props.askData.length > 0 ?
                        <Asks></Asks>
                    : null}
                </div>
            </div>
        </>
     );
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);