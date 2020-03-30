import { Injectable, Injector } from '@angular/core';

import * as $t from "three";

import * as models from "~engine/models";
import { VisualState } from './visual-state';
import { VisualEvent } from './visual-event';
import { VisualModule } from './visual-module';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

@Injectable()
export class VisualController {

    animateObjects = new Array<models.RenderObject>();

    constructor(
        injector: Injector,
        public state: VisualState,
        public event: VisualEvent) {

        for (const animType of VisualModule.animateProvider) {
            this.animateObjects.push(injector.get(animType));
        }
    }

    init(config: models.StartupConfig) {
        this.state.$t_camera = new $t.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.state.$t_camera.position.z = 1;

        this.state.$t_scene = new $t.Scene();

        //this.$t_scene.add(mesh);

        this.state.$t_renderer = new $t.WebGLRenderer({ antialias: true });
        this.state.$t_renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        config.canvasEle.appendChild(this.state.$t_renderer.domElement);


        var controls = new DragControls(this.state.$t_scene.children, this.state.$t_camera, this.state.$t_renderer.domElement);

        controls.addEventListener('dragstart', (event: any) => {
            //event.object.material.emissive.set(0xaaaaaa);
        });

        controls.addEventListener('dragend', (event: any) => {
            //event.object.material.emissive.set(0x000000);
            this.state.refreshFrame();
        });

        return this;
    }

    animate() {
        this.event.beforAnimateFrame.next(this.event);
        this._animateFrame();
    }

    private _animateFrame() {
        if (this.state.animateStatus === models.VisualAnimateStateType.play) {
            requestAnimationFrame(this._animateFrame.bind(this));
        }

        this.event.frameAnimate.next(this.event);

        this.state.$t_renderer.render(this.state.$t_scene, this.state.$t_camera);
    }

    addObject3D(obj3d: $t.Object3D) {
    }


}

