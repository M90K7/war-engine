import { Injectable } from '@angular/core';

import * as $t from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";

import * as models from "~engine/models";
import { VisualEvent } from '../visual-event';
import { VisualState } from '../visual-state';

@Injectable()
export class BoxObject extends models.GameRenderObject {

    constructor(
        private vstate: VisualState,
        private vevent: VisualEvent
    ) {
        super();

        this.geometry = new $t.BoxGeometry(0.2, 0.2, 0.2);
        this.geometry.name = `box_${this.geometry.id}`;

        this.material = new $t.MeshNormalMaterial();
        this.material.name = `material_${this.material.id}`;

        this.mesh = new $t.Mesh(this.geometry, this.material);
        this.mesh.name = `mesh_${this.mesh.id}`;

        this.vevent.beforAnimateFrame.subscribe(() => {
        });
        this.vevent.frameAnimate.subscribe(this.render.bind(this));

        // var controls = new DragControls([this.mesh], this.vstate.$t_camera, this.vstate.$t_renderer.domElement);
        // controls.addEventListener('dragstart', (event: any) => {
        //     //event.object.material.emissive.set(0xaaaaaa);
        // });
        // controls.addEventListener('dragend', (event: any) => {
        //     //event.object.material.emissive.set(0x000000);
        //     this.vstate.refreshFrame();
        // });
    }

    render(): void {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
    }
}