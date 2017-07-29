/**
 *
 * BillingForm
 *
 */

import React from 'react';
// import styled from 'styled-components';

class FuncBillingForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title, total, items } = this.props;

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
            items.map((item, index) => <tr key={`item-${index}`}>
              <td>{item.name}</td>
              <td>{item.cnt}</td>
              <td>{item.sum.toFixed(6)}</td>
              <td>{(item.sum / item.cnt).toFixed(6)}</td>
              <td>{item.billing.toFixed(4)}</td>
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
  items: React.PropTypes.array,
};

export default FuncBillingForm;
