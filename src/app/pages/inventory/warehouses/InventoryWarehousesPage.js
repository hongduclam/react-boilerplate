import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {
  reducer,
  saga,
} from 'app/pages/inventory/warehouses/redux/inventory-warehouses.duck';
import { compose, pure } from 'recompose';

import InventoryWarehousesEdit from 'app/pages/inventory/warehouses/components/inventory-add-or-edit/InventoryWarehousesEdit';
import InventoryWarehouseCard from 'app/pages/inventory/warehouses/InventoryWarehousesCard';
import { InventoryWarehousesUIProvider } from 'app/pages/inventory/warehouses/InventoryWarehoursesUIContext';
import { useInjectReducer } from '_core/utils/injectReducer';
import { useInjectSaga } from '_core/utils/injectSaga';
import { MODULE_STATE_NAME } from 'app/pages/inventory/warehouses/constants';

function InventoryWarehousesPage({ history }) {
  useInjectReducer({ key: MODULE_STATE_NAME, reducer });
  useInjectSaga({ key: MODULE_STATE_NAME, saga });

  const uiEvents = {
    onNew: () => {
      history.push('/inventory/warehouses/new');
    },
    onEdit: id => {
      history.push(`/inventory/warehouses/${id}/edit`);
    },
    onCancel: () => {
      history.push(`/inventory/warehouses/list`);
    },
  };

  console.log('InventoryWarehousesPage');

  return (
    <InventoryWarehousesUIProvider uiEvents={uiEvents}>
      <Route
        path="/inventory/warehouses/new"
        component={InventoryWarehousesEdit}
      />
      <Route
        path="/inventory/warehouses/:id/edit"
        component={InventoryWarehousesEdit}
      />
      <Route
        path="/inventory/warehouses/list"
        component={InventoryWarehouseCard}
      />
    </InventoryWarehousesUIProvider>
  );
}

InventoryWarehousesPage.propTypes = {
  history: PropTypes.any,
};

InventoryWarehousesPage.defaultProps = {};

export default compose(pure)(InventoryWarehousesPage);
