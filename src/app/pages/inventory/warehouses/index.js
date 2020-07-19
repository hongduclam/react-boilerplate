import loadable from '_core/utils/loadable';

const InventoryWarehousePage = loadable(() =>
  import('app/pages/inventory/warehouses/InventoryWarehousesPage'),
);

export default InventoryWarehousePage;
