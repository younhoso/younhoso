import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { MenuAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { ProductsPageTemplate } from '@/components/templates';
import { Menu, MenuCategory } from '@/types';

export default function Categories() {
  const router = useRouter();
  const { id: categoryId, branchId } = router.query;

  const [menus, setMenus] = useState<Menu[] | undefined>(undefined);
  const [categories, setCategories] = useState<MenuCategory[] | undefined>(undefined);

  useEffect(() => {
    if (!categoryId) return;

    MenuAPI.Category.getList()
      .then(res => {
        setCategories(res);
      })
      .catch(err => {
        console.error(err);
      });

    MenuAPI.getList({
      categoryId: Number(categoryId),
      ...(branchId
        ? {
            branchId: `${Number(`${branchId}`)}`,
          }
        : {}),
    })
      .then(res => {
        setMenus(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [categoryId]);

  if (!categories || !menus) {
    return null;
  }

  const props = {
    selectedCategoryId: Number(categoryId),
    categories: categories,
    products: menus,
  };

  return (
    <>
      <Desktop>
        <ProductsPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <ProductsPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
