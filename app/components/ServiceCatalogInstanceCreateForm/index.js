/**
*
* ServiceCatalogInstancesCreateForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

class ServiceCatalogInstanceCreateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      serviceClassName: '',
      plan: '',
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
      kind: 'Instance',
      metadata: {
        name: this.state.name,
        namespace: 'fission',
      },
      spec: {
        planName: this.state.planName,
        serviceClassName: this.state.serviceClassName,
      },
    });
  }

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="instancesCreateName"><FormattedMessage {...commonMessages.name} /></label>
          <input type="text" className="form-control" id="instancesCreateName" name="name" onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="instancesCreateServiceClassName"><FormattedMessage {...commonMessages.serviceClass} /></label>
          <input type="text" className="form-control" id="instancesCreateServiceClassName" name="serviceClassName" onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="instancesCreatePlanName"><FormattedMessage {...commonMessages.plan} /></label>
          <input type="text" className="form-control" id="instancesCreatePlanName" name="planName" onChange={this.onChange} />
        </div>
        <button className="btn btn-default" onClick={this.onCreate} ><FormattedMessage {...commonMessages.add} /></button>
      </form>
    );
  }
}

ServiceCatalogInstanceCreateForm.propTypes = {
  onCreate: React.PropTypes.func,
};

export default ServiceCatalogInstanceCreateForm;
