/**
 *
 * BillingForm
 *
 */

import React from 'react';
// import styled from 'styled-components';

class SvcBillingForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title, total, svcs } = this.props;

    return (
      <div>
        <h4>{title}</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service Class</th>
              <th>Create Time</th>
              <th>Alive Minutes</th>
              <th>Billing</th>
            </tr>
          </thead>
          <tbody>
            {
            svcs.map((item, index) => <tr key={`item-${index}`}>
              <td>{item.name}</td>
              <td>{item.classname}</td>
              <td>{item.ctime}</td>
              <td>{item.alive.toFixed(2)}</td>
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

SvcBillingForm.propTypes = {
  title: React.PropTypes.string,
  total: React.PropTypes.number,
  svcs: React.PropTypes.array,
};

export default SvcBillingForm;
