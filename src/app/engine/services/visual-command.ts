import { Injectable, Injector } from '@angular/core';

import * as models from "~engine/models";
import { VisualState } from './visual-state';
import { VisualController } from './visual-controller';
import { objectDef } from './visual-module';

@Injectable()
export class VisualCommand {

    constructor(
        public injector: Injector,
        public state: VisualState,
        public visual: VisualController) {
    }

    /**
     * Start game
     */
    playAnimate() {
        this.state.animateStatus = models.VisualAnimateStateType.play;
        this.visual.animate();
    }

    /**
     * Stop game and restore game-object to init state.
     */
    stopAnimate() {
        this.state.animateStatus = models.VisualAnimateStateType.stop;
        // TODO back to init state
    }

    /**
     * Pause game and can modify game-object state
     */
    pauseAnimate() {
        // pause mode
        if (this.state.animateStatus === models.VisualAnimateStateType.play) {
            this.state.animateStatus = models.VisualAnimateStateType.pause;
            return;
        }

        // unpause mode
        this.state.animateStatus = models.VisualAnimateStateType.play;
        this.visual.animate();
    }

    /**
     * Step going on to next frame
     * This lets you step through your game one frame at a time.
     */
    stepAnimate() {
        if (this.state.animateStatus === models.VisualAnimateStateType.pause) {

        }
    }

    addGeometry(objType: models.RenderObjectType) {
        const type = objectDef[objType];
        const obj: models.GameRenderObject = this.injector.get(type);
        this.state.virtualTree.push(obj);
        this.state.$t_scene.add(obj.mesh);
        this.state.refreshFrame();
    }

}