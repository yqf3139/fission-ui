/**
*
* ServiceCatalogBindingsCreateForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

class ServiceCatalogBindingCreateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      instanceRefName: '',
      secretName: '',
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
      kind: 'Binding',
      metadata: {
        name: this.state.name,
        namespace: 'fission',
      },
      spec: {
        instanceRef: {
          name: this.state.instanceRefName,
        },
        secretName: this.state.secretName,
      },
    });
  }

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="bindingsCreateName"><FormattedMessage {...commonMessages.name} /></label>
          <input type="text" className="form-control" id="bindingsCreateName" name="name" onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="bindingsCreateServiceInstanceRefName"><FormattedMessage {...commonMessages.instance} /></label>
          <input type="text" className="form-control" id="bindingsCreateServiceInstanceRefName" name="instanceRefName" onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="bindingsCreateSecretName"><FormattedMessage {...commonMessages.secret} /></label>
          <input type="text" className="form-control" id="bindingsCreateSecretName" name="secretName" onChange={this.onChange} />
        </div>
        <button className="btn btn-default" onClick={this.onCreate} ><FormattedMessage {...commonMessages.add} /></button>
      </form>
    );
  }
}

ServiceCatalogBindingCreateForm.propTypes = {
  onCreate: React.PropTypes.func,
};

export default ServiceCatalogBindingCreateForm;
