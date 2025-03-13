
import stonePatio from '../../../../assets/images/Decoration/Stone-Patio.svg';
import stonePatioHexagon from '../../../../assets/images/Decoration/Stone-Patio-Hexagon.svg';
import pathway from '../../../../assets/images/Decoration/Pathway.svg';
import pathwayCorner from '../../../../assets/images/Decoration/Pathway-corner.svg';
import houseNr1 from '../../../../assets/images/Decoration/House-Nr-1.svg';
import houseNr2 from '../../../../assets/images/Decoration/House-Nr-2.svg';
import houseNr3 from '../../../../assets/images/Decoration/House-Nr-3.svg';
import houseNr4 from '../../../../assets/images/Decoration/House-Nr-4.svg';
import houseNr5 from '../../../../assets/images/Decoration/House-Nr-5.svg';
import houseNr6 from '../../../../assets/images/Decoration/House-Nr-6.svg';
import pearShapedPond from '../../../../assets/images/Decoration/pear-shaped-pond.svg';
import pearShapedPool from '../../../../assets/images/Decoration/pear-shaped-pool.svg';
import rundShapedPool from '../../../../assets/images/Decoration/rund-shaped-pool.svg';
import rundShapedPond from '../../../../assets/images/Decoration/rund-shaped-pond.svg';
import woodenFence from '../../../../assets/images/Decoration/Wooden-Fence.svg';
import woodenFence1 from '../../../../assets/images/Decoration/Wooden-Fence1.svg';
import diningSet from '../../../../assets/images/Decoration/Dining-Set.svg';
import woodenBench from '../../../../assets/images/Decoration/Wooden-Bench.svg';
import woodenBench1 from '../../../../assets/images/Decoration/Wooden-Bench1.svg';
import woodenTable from '../../../../assets/images/Decoration/Wooden-Table.svg';
import woodenTable1 from '../../../../assets/images/Decoration/Wooden-Table1.svg';
import stoneNr1 from '../../../../assets/images/Decoration/Stone-Nr-1.svg';
import stoneNr2 from '../../../../assets/images/Decoration/Stone-Nr-2.svg';
import stoneNr3 from '../../../../assets/images/Decoration/Stone-Nr-3.svg';
import stoneNr4 from '../../../../assets/images/Decoration/Stone-Nr-4.svg';
import stoneNr5 from '../../../../assets/images/Decoration/Stone-Nr-5.svg';
import stoneNr6 from '../../../../assets/images/Decoration/Stone-Nr-6.svg';
import stonePatioTerracotta from '../../../../assets/images/Decoration/Stone-Patio-Terracotta.svg';
import patioTerracotta from '../../../../assets/images/Decoration/Patio-Terracotta.svg';
import stonePatioTerracotta2 from '../../../../assets/images/Decoration/Stone-Patio-Terracotta2.svg';

export const imagePaths = {
    stonePatio,
    stonePatioHexagon,
    pathway,
    pathwayCorner,
    houseNr1,
    houseNr2,
    houseNr3,
    houseNr4,
    houseNr5,
    houseNr6,
    pearShapedPond,
    pearShapedPool,
    rundShapedPool,
    rundShapedPond,
    woodenFence,
    woodenFence1,
    diningSet,
    woodenBench,
    woodenBench1,
    woodenTable,
    woodenTable1,
    stoneNr1,
    stoneNr2,
    stoneNr3,
    stoneNr4,
    stoneNr5,
    stoneNr6,
    stonePatioTerracotta,
    patioTerracotta,
    stonePatioTerracotta2
};


const items: {
    name: string;
    img: string;
    id: string;
}[] = [
    { name: 'Stone Patio', img: imagePaths.stonePatio, id: 'stone-patio' },
    { name: 'Stone Patio Hexagon', img: imagePaths.stonePatioHexagon, id: 'stone-patio-hexagon' },
    { name: 'Pathway', img: imagePaths.pathway, id: 'pathway' },
    { name: 'Pathway Corner', img: imagePaths.pathwayCorner, id: 'pathway-corner' },
    { name: 'House Nr. 1', img: imagePaths.houseNr1, id: 'house-nr-1' },
    { name: 'House Nr. 2', img: imagePaths.houseNr2, id: 'house-nr-2' },
    { name: 'House Nr. 3', img: imagePaths.houseNr3, id: 'house-nr-3' },
    { name: 'House Nr. 4', img: imagePaths.houseNr4, id: 'house-nr-4' },
    { name: 'House Nr. 5', img: imagePaths.houseNr5, id: 'house-nr-5' },
    { name: 'House Nr. 6', img: imagePaths.houseNr6, id: 'house-nr-6' },
    { name: 'Pear Shaped Pond', img: imagePaths.pearShapedPond, id: 'pear-shaped-pond' },
    { name: 'Pear Shaped Pool', img: imagePaths.pearShapedPool, id: 'pear-shaped-pool' },
    { name: 'Rund Shaped Pool', img: imagePaths.rundShapedPool, id: 'rund-shaped-pool' },
    { name: 'Rund Shaped Pond', img: imagePaths.rundShapedPond, id: 'rund-shaped-pond' },
    { name: 'Wooden Fence', img: imagePaths.woodenFence, id: 'wooden-fence' },
    { name: 'Wooden Fence 1', img: imagePaths.woodenFence1, id: 'wooden-fence-1' },
    { name: 'Dining Set', img: imagePaths.diningSet, id: 'dining-set' },
    { name: 'Wooden Bench', img: imagePaths.woodenBench, id: 'wooden-bench' },
    { name: 'Wooden Bench 1', img: imagePaths.woodenBench1, id: 'wooden-bench-1' },
    { name: 'Wooden Table', img: imagePaths.woodenTable, id: 'wooden-table' },
    { name: 'Wooden Table 1', img: imagePaths.woodenTable1, id: 'wooden-table-1' },
    { name: 'Stone Nr. 1', img: imagePaths.stoneNr1, id: 'stone-nr-1' },
    { name: 'Stone Nr. 2', img: imagePaths.stoneNr2, id: 'stone-nr-2' },
    { name: 'Stone Nr. 3', img: imagePaths.stoneNr3, id: 'stone-nr-3' },
    { name: 'Stone Nr. 4', img: imagePaths.stoneNr4, id: 'stone-nr-4' },
    { name: 'Stone Nr. 5', img: imagePaths.stoneNr5, id: 'stone-nr-5' },
    { name: 'Stone Nr. 6', img: imagePaths.stoneNr6, id: 'stone-nr-6' },
    { name: 'Stone Patio Terracotta', img: imagePaths.stonePatioTerracotta, id: 'stone-patio-terracotta' },
    { name: 'Patio Terracotta', img: imagePaths.patioTerracotta, id: 'patio-terracotta' },
    { name: 'Stone Patio Terracotta 2', img: imagePaths.stonePatioTerracotta2, id: 'stone-patio-terracotta-2' }
];

export default items;
