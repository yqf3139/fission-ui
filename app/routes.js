// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/FunctionsPage/reducer'), // One reducer for all subroutes
          System.import('containers/EnvironmentsPage/reducer'),
          System.import('containers/FunctionsPage'),
          System.import('containers/FunctionsListPage/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([functionsReducer, environmentsReducer, component, sagas]) => {
          injectReducer('functions', functionsReducer.default);
          injectReducer('environments', environmentsReducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('containers/FunctionsListPage'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([component]) => {
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      childRoutes: [
        {
          path: '/functions/create',
          name: 'function_create',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/FunctionCreatePage/sagas'),
              System.import('containers/EnvironmentsListPage/sagas'),

              System.import('containers/FunctionCreatePage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, sagasEnvironments, component]) => {
              injectSagas(sagas.default);
              injectSagas(sagasEnvironments.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/functions/batch_upload',
          name: 'function_batch_upload',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/FunctionUploadPage/sagas'),
              System.import('containers/EnvironmentsListPage/sagas'),

              System.import('containers/FunctionUploadPage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, sagasEnvironments, component]) => {
              injectSagas(sagas.default);
              injectSagas(sagasEnvironments.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/functions/edit/:name',
          name: 'function_edit',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/FunctionEditPage/sagas'),
              System.import('containers/FunctionCreatePage/sagas'),
              System.import('containers/EnvironmentsListPage/sagas'),

              System.import('containers/FunctionEditPage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, sagasFnCreate, sagasEnvironments, component]) => {
              injectSagas(sagas.default);
              injectSagas(sagasFnCreate.default);
              injectSagas(sagasEnvironments.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    }, {
      path: '/environments',
      name: 'environments',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/EnvironmentsPage/reducer'), // One reducer for all subroutes
          System.import('containers/EnvironmentsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('environments', reducer.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('containers/EnvironmentsListPage/sagas'),
            System.import('containers/EnvironmentsListPage'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([sagas, component]) => {
            injectSagas(sagas.default);

            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      childRoutes: [
        {
          path: '/environments/create',
          name: 'environments_create',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/EnvironmentCreatePage/sagas'),
              System.import('containers/EnvironmentCreatePage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/environments/edit/:name',
          name: 'environments_edit',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/EnvironmentEditPage/sagas'),
              System.import('containers/EnvironmentEditPage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    }, {
      path: '/benchmarks',
      name: 'benchmarks',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/BenchmarksPage/reducer'), // One reducer for all subroutes
          System.import('containers/BenchmarksPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('benchmarks', reducer.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      indexRoute: {
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('containers/BenchmarkConfigsListPage/sagas'),
            System.import('containers/BenchmarkConfigsListPage'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([sagas, component]) => {
            injectSagas(sagas.default);

            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      childRoutes: [
        {
          path: '/benchmarks/configs/:configName',
          name: 'benchmarks_config',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/BenchmarkConfigPage/sagas'),
              System.import('containers/BenchmarkConfigPage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/benchmarks/configs/:configName/instances',
          name: 'benchmarks_instance_list',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/BenchmarkInstancesListPage/sagas'),
              System.import('containers/BenchmarkInstancesListPage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/benchmarks/configs/:configName/instances/:instanceName',
          name: 'benchmarks_instance',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/BenchmarkInstancePage/sagas'),
              System.import('containers/BenchmarkInstancePage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([sagas, component]) => {
              injectSagas(sagas.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    }, {
      path: '/service-catalog',
      name: 'service catalog',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ServiceCatalogPage/reducer'), // One reducer for all subroutes
          System.import('containers/ServiceCatalogPage/sagas'),
          System.import('containers/ServiceCatalogPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('service-catalog', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
