import ProductQnaTableMobile from './mobile/ProductQnaTableMobile';
import _ProductQnaTable from './pc/ProductQnaTable';

type ProductQnaTableP = typeof _ProductQnaTable;

interface ProductQnaTableType extends ProductQnaTableP {
  Mobile: typeof ProductQnaTableMobile;
}

const ProductQnaTable = _ProductQnaTable as ProductQnaTableType;

ProductQnaTable.Mobile = ProductQnaTableMobile;

export default ProductQnaTable;
