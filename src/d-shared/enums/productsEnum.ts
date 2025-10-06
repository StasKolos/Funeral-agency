import { ballsItems } from '../data/ballsItems';
import { basketsItems } from '../data/basketsItems';
import { coffinItems } from '../data/coffinItems';
import { crossItems } from '../data/crossItems';
import { fencesItems } from '../data/fencesItems';
import { horizontalMonumentItems } from '../data/horizontalMonumentItems';
import { tablesAndChairsItems } from '../data/tablesAndChairsItems';
import { vasesItems } from '../data/vasesItems';
import { verticalMonumentItems } from '../data/verticalMonumentItems';
import { wreathsItems } from '../data/wreathsItems';

export const ProductsEnum = {
    VERTICAL_MONUMENT: {
        value: 'VERTICAL_MONUMENT',
        name: 'Вертикальные стелы',
        route: 'vertical-monument-products-gallery',
        items: verticalMonumentItems,
    },
    HORIZONTAL_MONUMENT: {
        value: 'HORIZONTAL_MONUMENT',
        name: 'Горизонтальные стелы',
        route: 'horizontal-monument-products-gallery',
        items: horizontalMonumentItems,
    },
    CROSS: {
        value: 'CROSS',
        name: 'Кресты',
        route: 'cross-products-gallery',
        items: crossItems,
    },
    TABLES_AND_CHAIRS: {
        value: 'TABLES_AND_CHAIRS',
        name: 'Столы и лавки',
        route: 'tables-and-chairs-products-gallery',
        items: tablesAndChairsItems,
    },
    FENCES: {
        value: 'FENCES',
        name: 'Ограды',
        route: 'fences-products-gallery',
        items: fencesItems,
    },
    VASES: {
        value: 'VASES',
        name: 'Вазы',
        route: 'vases-products-gallery',
        items: vasesItems,
    },
    BALLS: {
        value: 'BALLS',
        name: 'Шары',
        route: 'balls-products-gallery',
        items: ballsItems,
    },
    COFFIN: {
        value: 'COFFIN',
        name: 'Гробы',
        route: 'coffin-products-gallery',
        items: coffinItems,
    },
    WREATHS: {
        value: 'WREATHS',
        name: 'Венки',
        route: 'wreaths-products-gallery',
        items: wreathsItems,
    },
    BASKETS: {
        value: 'BASKETS',
        name: 'Корзины',
        route: 'baskets-products-gallery',
        items: basketsItems,
    },
} as const;

export type ProductsEnumType = keyof typeof ProductsEnum;
