import circleGrass from '../../../../assets/images/GroundMaterials/circle-grass.svg';
import rectGrass from '../../../../assets/images/GroundMaterials/rect-grass.svg';
import gardenBed from '../../../../assets/images/GroundMaterials/garden-bed.svg';
import circleGardenBed from '../../../../assets/images/GroundMaterials/circle-garden-bed.svg';
import WedgeGardenBed from '../../../../assets/images/GroundMaterials/wedge-garden-bed.svg';
import WedgeGrass from '../../../../assets/images/GroundMaterials/wedge-grass.svg';
import WedgeGardenBed90Angle from '../../../../assets/images/GroundMaterials/Wedge-Garden-Bed-90-angel.svg';

const items: {
    name: string;
    img: string;
}[] = [
    { name: 'Rect Lawn', img: rectGrass },
    {  name: 'Round Lawn', img: circleGrass },
    { name: 'Wedge Grass', img: WedgeGrass },
    { name: 'Garden Bed', img: gardenBed },
    { name: 'Round Garden Bed', img: circleGardenBed },
    { name: 'Wedge Garden Bed', img: WedgeGardenBed },
    { name: 'Wedge Garden Bed', img: WedgeGardenBed90Angle }
];

export default items;