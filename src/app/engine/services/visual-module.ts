import * as models from "~engine/models";
import { FpsObject } from './animate-object';
import { BoxObject } from './animate-object/box-object';

export const VisualModule = {
    animateProvider: [
        FpsObject
    ],
    objectProvider: [
        BoxObject
    ]
};
export const objectDef = {
    [models.RenderObjectType.box]: BoxObject
}