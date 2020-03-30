import { Injectable } from '@angular/core';

import * as models from "~engine/models";
import { VisualEvent } from '../visual-event';
import { VisualState } from '../visual-state';

@Injectable()
export class FpsObject implements models.RenderObject {

    private __l_fps: number = performance.now();
    private __c_fps: number = 0;

    constructor(
        private vstate: VisualState,
        private vevent: VisualEvent
    ) {
        this.vevent.beforAnimateFrame.subscribe(() => {
            this.__l_fps = performance.now();
            this.__c_fps = 0;
        });

        this.vevent.frameAnimate.subscribe(this.render.bind(this));
    }

    render(): void {
        const elapse = performance.now() - this.__l_fps;
        if (elapse > 999) {
            this.__c_fps -= Math.round((elapse - 1000) / 16.66666666);
            this.__l_fps = performance.now();
            this.vstate.fps = this.__c_fps;
            console.log(this.__c_fps);
            this.__c_fps = 0;
        }
        this.__c_fps++;
    }
}