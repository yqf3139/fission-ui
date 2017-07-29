/**
 *
 * BillingForm
 *
 */

import React from 'react';
// import styled from 'styled-components';

const MONEY_PER_100MS = 0.00001;
const MONEY_PER_INVOKE = 0.00001;

class FuncBillingForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /* eslint-disable no-mixed-operators */
  render() {
    const { title, total, sum, cnt, discount } = this.props;
    const table = {};
    sum.map((e) => {
      table[e.name] = {};
      table[e.name].name = e.name;
      table[e.name].sum = e.value;
      return null;
    });
    cnt.map((e) => {
      table[e.name].cnt = e.value;
      return null;
    });
    const arr = Object.keys(table).sort().map((k) => table[k]);
    return (
      <div>
        <h4>{title}</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Invocations</th>
              <th>Sum Computation (sec)</th>
              <th>Avg Computation (sec)</th>
              <th>Billing</th>
            </tr>
          </thead>
          <tbody>
            {
            arr.map((item, index) => <tr key={`item-${index}`}>
              <td>{item.name.replace('/fission-function/', '')}</td>
              <td>{item.cnt}</td>
              <td>{item.sum.toFixed(6)}</td>
              <td>{(item.sum / item.cnt).toFixed(6)}</td>
              <td>{((item.cnt * MONEY_PER_INVOKE + item.sum / 10 * MONEY_PER_100MS) * discount).toFixed(4)}</td>
            </tr>)
            }
          </tbody>
        </table>
        <span className="pull-right">Sum: ￥{total.toFixed(4)}</span>
        <br />
      </div>
    );
  }
}

FuncBillingForm.propTypes = {
  title: React.PropTypes.string,
  total: React.PropTypes.number,
  discount: React.PropTypes.number,
  sum: React.PropTypes.array,
  cnt: React.PropTypes.array,
};

export default FuncBillingForm;
