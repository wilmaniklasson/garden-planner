
import rectGrass from '../../../../assets/images/GroundMaterials/rect-grass.svg';
import circleGrass from '../../../../assets/images/GroundMaterials/circle-grass.svg';
import wedgeGrass from '../../../../assets/images/GroundMaterials/wedge-grass.svg';
import gardenBed from '../../../../assets/images/GroundMaterials/garden-bed.svg';
import circleGardenBed from '../../../../assets/images/GroundMaterials/circle-garden-bed.svg';
import wedgeGardenBed from '../../../../assets/images/GroundMaterials/wedge-garden-bed.svg';
import wedgeGardenBed90Angle from '../../../../assets/images/GroundMaterials/Wedge-Garden-Bed-90-angel.svg';

export const imagePaths = {
    rectGrass,
    circleGrass,
    wedgeGrass,
    gardenBed,
    circleGardenBed,
    wedgeGardenBed,
    wedgeGardenBed90Angle
};

const items: {
    name: string;
    img: string;
    id: string;
}[] = [
    { name: 'Rect Lawn', img: imagePaths.rectGrass, id: 'rect-grass' },
    { name: 'Round Lawn', img: imagePaths.circleGrass, id: 'circle-grass' },
    { name: 'Wedge Grass', img: imagePaths.wedgeGrass, id: 'wedge-grass' },
    { name: 'Garden Bed', img: imagePaths.gardenBed, id: 'garden-bed' },
    { name: 'Round Garden Bed', img: imagePaths.circleGardenBed, id: 'circle-garden-bed' },
    { name: 'Wedge Garden Bed', img: imagePaths.wedgeGardenBed, id: 'wedge-garden-bed' },
    { name: 'Wedge Garden Bed 90° Angle', img: imagePaths.wedgeGardenBed90Angle, id: 'wedge-garden-bed-90-angle' }
];

export default items;
