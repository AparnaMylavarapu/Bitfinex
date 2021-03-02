import React from 'react';
import DepthChart from './DepthChart';
import { connect } from 'react-redux';
import {maxPoints} from '../constants/index';

const mapStateToProps = (state) => {
    return {
        bidData: state.bidData,
        priceWithTotal: state.priceWithTotal
    }
}

const Bids = (props) => {
    const getXValues = (obj) => {
        return Object.keys(obj).slice(0, 35);
    }
    return(
        <>
        <DepthChart 
        chartValues={props.priceWithTotal.bid} 
        allData={getXValues(props.priceWithTotal.bid)} 
        type={'bid'}></DepthChart>
            <table>
                <thead>
                    <tr>
                    <th>
                        COUNT
                    </th>
                    <th>
                        AMOUNT
                    </th>
                    <th>
                        TOTAL
                    </th>
                    <th>
                        PRICE
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {props.bidData.slice(0, maxPoints).map((item, index) => {
                        return <React.Fragment key={"bid" + index}>
                            <tr>
                                <td>{item.count}</td>
                                <td>{item.amount}</td>
                                <td>{props.priceWithTotal.bid[item.price+'$']?props.priceWithTotal.bid[item.price+'$'].toFixed(3)
                                :props.priceWithTotal.bid[item.price+'$']}</td>
                                <td>{item.price}</td>
                            </tr>
                        </React.Fragment>
                    })}
                </tbody>
            </table>
        </>
    );
}

export default connect(mapStateToProps, null)(Bids);