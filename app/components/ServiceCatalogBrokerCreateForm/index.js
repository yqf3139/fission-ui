/**
*
* ServiceCatalogBrokersCreateForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

class ServiceCatalogBrokerCreateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      url: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onChange(event) {
    const target = event.target;
    this.state[target.name] = target.value;
  }

  onCreate(event) {
    event.preventDefault();
    this.props.onCreate({
      apiVersion: 'servicecatalog.k8s.io/v1alpha1',
      kind: 'Broker',
      metadata: {
        name: this.state.name,
        namespace: '',
      },
      spec: {
        url: this.state.url,
      },
    });
  }

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="brokersCreateName"><FormattedMessage {...commonMessages.name} /></label>
          <input type="text" className="form-control" id="brokersCreateName" name="name" onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="brokersCreateUrl"><FormattedMessage {...commonMessages.url} /></label>
          <input type="text" className="form-control" id="brokersCreateUrl" name="url" onChange={this.onChange} />
        </div>
        <button className="btn btn-default" onClick={this.onCreate} ><FormattedMessage {...commonMessages.add} /></button>
      </form>
    );
  }
}

ServiceCatalogBrokerCreateForm.propTypes = {
  onCreate: React.PropTypes.func,
};

export default ServiceCatalogBrokerCreateForm;
