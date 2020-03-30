import * as $t from "three";

import { RenderObject } from './visual';

export enum RenderObjectType {
    box = "box"
}

export abstract class GameRenderObject implements RenderObject {

    geometry: $t.BoxGeometry;
    material: $t.MeshNormalMaterial;
    mesh: $t.Mesh;
}
