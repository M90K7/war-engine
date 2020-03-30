import { Injectable, Injector } from '@angular/core';

import * as models from "~engine/models";
import { VisualModule, objectDef } from './visual-module';

@Injectable()
export class GameObjectHelper {

    constructor(private readonly injector: Injector) {
    }

    createObject(renderType: models.RenderObjectType) {
        const type = objectDef[renderType];
        return this.injector.get(type);
    }
}