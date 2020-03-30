import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class VisualEvent {

    beforAnimateFrame = new Subject<VisualEvent>();
    frameAnimate = new Subject<VisualEvent>();


}