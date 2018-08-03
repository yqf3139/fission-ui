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
              <th>名称</th>
              <th>服务类别</th>
              <th>创建时间</th>
              <th>服务时间(分钟)</th>
              <th>费用</th>
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
        <span className="pull-right">总计: ￥{total.toFixed(4)}</span>
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
