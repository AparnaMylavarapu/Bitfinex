import React from 'react';
import DepthChart from './DepthChart';
import { connect } from 'react-redux';
import {maxPoints} from '../constants/index';

const mapStateToProps = (state) => {
    return {
        askData: state.askData,
        priceWithTotal: state.priceWithTotal
    }
}

const Asks = (props) => {
    const getXValues = (obj) => {
        return Object.keys(obj).slice(0, 35);
    }
  return(
      <>
       <DepthChart 
        chartValues={props.priceWithTotal.ask} 
        allData={getXValues(props.priceWithTotal.ask)} 
        type={'ask'}></DepthChart>
        <table>
            <thead>
                <tr>
                <th>
                    PRICE
                </th>
                <th>
                    TOTAL
                </th>
                <th>
                    AMOUNT
                </th>
                <th>
                    COUNT
                </th>
                </tr>
            </thead>
            <tbody>
                {props.askData.slice(0,maxPoints).map((item, index) => {
                    return <React.Fragment key={"ask" + index}>
                        <tr>
                            <td>{item.price}</td>
                            <td>{props.priceWithTotal.ask[item.price+'$']}</td>
                            <td>{item.amount}</td>
                            <td>{item.count}</td>
                        </tr>
                    </React.Fragment>
                })}
            </tbody>
        </table>
    </>
  );
}

export default connect(mapStateToProps, null)(Asks);