import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import * as eng from "~engine";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'war-engine';

  vAnimType = eng.VisualAnimateStateType;
  objectType = eng.RenderObjectType;

  @ViewChild("canvasBox")
  canvasBoxEl: ElementRef;

  constructor(
    private readonly vcontroller: eng.VisualController,
    private vcommand: eng.VisualCommand,
    public vstate: eng.VisualState
  ) {
  }

  ngAfterViewInit(): void {
    this.vcontroller.init({
      canvasEle: this.canvasBoxEl.nativeElement
    });
  }

  onPlay() {
    this.vcommand.playAnimate()
  }
  onStop() {
    this.vcommand.stopAnimate();
  }
  onPause() {
    this.vcommand.pauseAnimate();
  }
  onStep() {
    this.vcommand.stepAnimate();
  }
  onAddGeometry(type: eng.RenderObjectType) {
    this.vcommand.addGeometry(type);
  }
}
