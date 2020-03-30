import { Injectable, Type } from '@angular/core';

import * as $t from "three";

import * as models from '~engine/models';

@Injectable()
export class VisualState {

    $t_camera: $t.Camera;
    $t_scene: $t.Scene;
    $t_renderer: $t.WebGLRenderer;

    animateStatus: models.VisualAnimateStateType = models.VisualAnimateStateType.stop;
    fps = 0;

    virtualTree = new Array<models.RenderObject>();

    refreshFrame() {
        this.$t_renderer.render(this.$t_scene, this.$t_camera);
    }
}
