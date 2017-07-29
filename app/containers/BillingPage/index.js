/*
 *
 * BillingPage
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import ErrorIndicator from 'components/ErrorIndicator';
import LoadingIndicator from 'components/LoadingIndicator';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import * as async from 'async';
import { queryPrometheus, catalogGet } from 'utils/api';
import FuncBillingForm from './funcform';
import SvcBillingForm from './svcform';

import messages from './messages';

const MONEY_PER_100MS = 0.00001;
const MONEY_PER_INVOKE = 0.00001;
const STD_DISCOUNT = 0.8;
const MONEY_SVC_PER_MINUTE = {
  redis: 0.0005,
  minio: 0.001,
  rethinkdb: 0.001,
};

export class BillingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /* eslint-disable no-mixed-operators */
  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      sum: { stdfuncs: [], appfuncs: [] },
      cnt: { stdfuncs: [], appfuncs: [] },
      svcs: [],
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  getSum(arr) {
    if (arr.length === 0) return 0;
    return arr.map((e) => e.value).reduce((a, b) => a + b);
  }

  getBilling(sum, cnt, discount) {
    const table = {};
    sum.map((e) => {
      const ref = {};
      table[e.name] = ref;
      ref.name = e.name.replace('/fission-function/', '');
      ref.sum = e.value;
      return null;
    });
    cnt.map((e) => {
      const ref = table[e.name];
      ref.cnt = e.value;
      ref.billing = (ref.cnt * MONEY_PER_INVOKE + ref.sum / 10 * MONEY_PER_100MS) * discount;
      return null;
    });
    return Object.keys(table).sort().map((k) => table[k]);
  }

  loadData() {
    const that = this;
    that.setState({ loading: true });

    const ns = window.fissionNamespace || 'fission';
    const LATENCY_SUM = `sum by (path) (fission_http_call_latency_seconds_summary_sum{kubernetes_namespace='${ns}'})`;
    const LATENCY_CNT = `sum by (path) (fission_http_call_latency_seconds_summary_count{kubernetes_namespace='${ns}'})`;

    const jobs = [LATENCY_SUM, LATENCY_CNT].map((q) => (cb) => {
      queryPrometheus(q).then((data) => {
        if (data.status !== 'success') {
          cb('query failed', null);
          return;
        }
        const results = data.data.result.map((r) => ({
          name: r.metric.path,
          value: parseFloat(r.value[1]),
        }));
        const stdfuncs = results.filter((r) => r.name.startsWith('/fission-function/std-'));
        const appfuncs = results.filter((r) => r.name.startsWith('/fission-function/app-'));
        cb(null, { stdfuncs, appfuncs });
      }).catch((err) => {
        cb(err, null);
      });
    });
    jobs.push((cb) => {
      catalogGet('instances').then((data) => {
        const results = data.items.map((e) => {
          const ctime = e.metadata.creationTimestamp;
          const alive = (Date.now() - new Date(ctime)) / 1000 / 60;
          const classname = e.spec.serviceClassName;
          const moneyPerMinute = MONEY_SVC_PER_MINUTE[classname] || 0.001;
          return {
            name: e.metadata.name,
            classname,
            ctime,
            alive,
            billing: alive * moneyPerMinute,
          };
        });
        cb(null, results);
      }).catch((err) => {
        cb(err, null);
      });
    });
    async.parallel(jobs, (err, results) => {
      if (err) {
        that.setState({
          error: err.toString(),
          loading: false,
        });
      }
      that.setState({
        sum: { stdfuncs: results[0].stdfuncs, appfuncs: results[0].appfuncs },
        cnt: { stdfuncs: results[1].stdfuncs, appfuncs: results[1].appfuncs },
        svcs: results[2],
        loading: false,
        error: false,
      });
    });
  }

  render() {
    const { loading, error, sum, cnt, svcs } = this.state;

    const stdsum = this.getSum(sum.stdfuncs);
    const appsum = this.getSum(sum.appfuncs);

    const stdcnt = this.getSum(cnt.stdfuncs);
    const appcnt = this.getSum(cnt.appfuncs);

    const apptotal = (appcnt * MONEY_PER_INVOKE)
      + ((appsum / 10) * MONEY_PER_100MS);
    const stdtotal = (stdcnt * MONEY_PER_INVOKE * STD_DISCOUNT)
      + ((stdsum / 10) * MONEY_PER_100MS * STD_DISCOUNT);

    const svctotal = svcs.length !== 0 ? svcs.map((e) => e.billing).reduce((a, b) => a + b) : 0;

    const total = apptotal + stdtotal + svctotal;

    const apps = this.getBilling(sum.appfuncs, cnt.appfuncs, 1);
    const stds = this.getBilling(sum.stdfuncs, cnt.stdfuncs, STD_DISCOUNT);

    const rankingData = [...apps, ...stds, ...svcs].sort((a, b) => b.billing - a.billing).slice(0, 8);

    if (loading) {
      return <LoadingIndicator />;
    }
    return (
      <div className="col-md-12">
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {error &&
          <ErrorIndicator errors={[error]} />
        }
        <h3>Rules</h3>
        <p>
          <i>For every function invocation: ￥{MONEY_PER_INVOKE}</i>
        </p>
        <p>
          <i>For every 100ms computation: ￥{MONEY_PER_100MS}</i>
        </p>
        <p>
          <i>For every third party service, charge according to SLA</i>
        </p>
        <p>
          <i>* {100 - (STD_DISCOUNT * 100)}% discount for using standard functions</i>
        </p>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <h3>Ranking</h3>
            <ResponsiveContainer width={'100%'} height={500} >
              <BarChart
                data={rankingData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 50, bottom: 10 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="billing" fill="#4285f4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="col-md-8">
            <h3>Details</h3>
            <FuncBillingForm
              title={'User functions'}
              items={apps}
              total={apptotal}
            />
            <FuncBillingForm
              title={'Standard functions'}
              items={stds}
              total={stdtotal}
            />
            <SvcBillingForm
              title={'Third party services'}
              svcs={svcs}
              total={svctotal}
            />
            <br />
            <hr />
            <h3>
              <span className="pull-right">Total: ￥{total.toFixed(4)}</span>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default BillingPage;
