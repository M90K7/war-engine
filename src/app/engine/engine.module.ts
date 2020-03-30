import { NgModule } from '@angular/core';

import * as svc from "~engine/services";

@NgModule({
    providers: [
        svc.VisualState,
        svc.VisualCommand,
        svc.VisualController,
        svc.VisualEvent,
        //svc.GameObjectHelper,
        [svc.VisualModule.animateProvider],
        [svc.VisualModule.objectProvider]
    ]
})
export class EngineModule {
}
