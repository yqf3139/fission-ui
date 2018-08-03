/*
 *
 * ServiceCatalogPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import ErrorIndicator from 'components/ErrorIndicator';
import LoadingIndicator from 'components/LoadingIndicator';
import * as S from 'containers/ServiceCatalogPage/selectors';
import ServiceCatalogBrokersForm from 'components/ServiceCatalogBrokersForm';
import ServiceCatalogClassesForm from 'components/ServiceCatalogClassesForm';
import ServiceCatalogInstancesForm from 'components/ServiceCatalogInstancesForm';
import ServiceCatalogBindingsForm from 'components/ServiceCatalogBindingsForm';

import { loadAction, createAction, removeAction } from './actions';
import messages from './messages';

export class ServiceCatalogPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onRemove = this.onRemove.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    const loadData = this.props.loadData;
    loadData('brokers');
    loadData('serviceclasses');
    loadData('instances');
    loadData('bindings');
  }

  onRemove(category, item) {
    this.props.remove(category, item);
  }

  onCreate(category, item) {
    this.props.create(category, item);
  }

  render() {
    const { loading, error, brokers, serviceclasses, instances, bindings, remove, create } = this.props;
    if (loading) {
      return <LoadingIndicator />;
    }
    return (
      <div className="col-md-12">
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {error &&
          <ErrorIndicator errors={[error.getIn(['data', 'message'])]} />
        }
        <ServiceCatalogBrokersForm
          items={brokers}
          onCreate={(i) => create('brokers', i)}
          onRemove={(i) => remove('brokers', i)}
        />
        <ServiceCatalogClassesForm
          items={serviceclasses}
        />
        <ServiceCatalogInstancesForm
          items={instances}
          onCreate={(i) => create('instances', i)}
          onRemove={(i) => remove('instances', i)}
        />
        <ServiceCatalogBindingsForm
          items={bindings}
          onCreate={(i) => create('bindings', i)}
          onRemove={(i) => remove('bindings', i)}
        />
      </div>
    );
  }
}

ServiceCatalogPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  brokers: PropTypes.array,
  serviceclasses: PropTypes.array,
  instances: PropTypes.array,
  bindings: PropTypes.array,
  loadData: PropTypes.func,
  create: PropTypes.func,
  remove: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  brokers: S.makeSelectBrokers(),
  serviceclasses: S.makeSelectServiceClasses(),
  instances: S.makeSelectInstances(),
  bindings: S.makeSelectBindings(),
  loading: S.makeSelectLoading(),
  error: S.makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadData: (c) => dispatch(loadAction(c)),
    create: (c, i) => dispatch(createAction(c, i)),
    remove: (c, i) => dispatch(removeAction(c, i)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCatalogPage);
