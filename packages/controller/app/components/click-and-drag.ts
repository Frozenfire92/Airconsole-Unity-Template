import Component from '@glimmer/component';
import { action } from '@ember/object';
import throttle from 'lodash.throttle';

import { ClickAndDragInputType } from 'controller/enums/input';
import { clamp } from 'controller/utils/math';

const THROTTLE_TIME = 200;

interface ClickAndDragArgs {
  show: boolean
  onInput: (data: any) => void
}

export default class ClickAndDrag extends Component<ClickAndDragArgs> {
  swipeAnalog: any;
  circle?: SVGElement;
  line?: SVGElement;
  aiming = false;
  maxX = 0;
  maxY = 0;
  fingerRadius = 15;
  minSwipeDistance = 20;

  @action setup(element: Element) {
    this.line = element.querySelector('svg line') as SVGElement;
    this.circle = element.querySelector('svg circle') as SVGElement;
    let swipeStyle = window.getComputedStyle(element.querySelector('svg') as Element);
    this.maxX = parseInt(swipeStyle.width.replace("px", ""));
    this.maxY = parseInt(swipeStyle.height.replace("px", ""));
    this.swipeAnalog = new SwipeAnalog(element, {
      touchstart: () => this.swipeAreaTouchStart(),
			touchmove: (swipeVector: any) => this.swipeAreaTouchMove(swipeVector),
			touchend: (swipeVector: any) => this.swipeAreaTouchEnd(swipeVector),
			min_swipe_distance: this.minSwipeDistance
    });
  }

  throttledSendInput = throttle((t: ClickAndDragInputType, swipeVector: any) => {
    this.sendInput(t, swipeVector);
  }, THROTTLE_TIME, { trailing: false });

  sendInput(t: ClickAndDragInputType, swipeVector: any) {
    if (swipeVector && swipeVector.distance >= this.minSwipeDistance) {
      this.args.onInput({
        t,
        d: swipeVector.distance ?? 0,
        a: swipeVector.angle ?? 0
      });
    }
  }

  swipeAreaTouchStart() {
    if (!this.aiming && this.args.show) {
      this.aiming = true;
      this.circle?.setAttribute("cx", clamp(this.swipeAnalog.start_position.x, 0, this.maxX).toString());
      this.circle?.setAttribute("cy", clamp(this.swipeAnalog.start_position.y, 0, this.maxY).toString());
      this.circle?.setAttribute("r", this.fingerRadius.toString());
      this.line?.setAttribute("x1", clamp(this.swipeAnalog.start_position.x, 0, this.maxX).toString());
      this.line?.setAttribute("y1", clamp(this.swipeAnalog.start_position.y, 0, this.maxY).toString());
      this.line?.setAttribute("x2", clamp(this.swipeAnalog.start_position.x, 0, this.maxX).toString());
      this.line?.setAttribute("y2", clamp(this.swipeAnalog.start_position.y, 0, this.maxY).toString());
    }
  }

  swipeAreaTouchMove(swipeVector: any) {
    if (this.aiming && this.args.show) {
      this.line?.setAttribute("x1", clamp(this.swipeAnalog.end_position.x, 0, this.maxX).toString());
      this.line?.setAttribute("y1", clamp(this.swipeAnalog.end_position.y, 0, this.maxY).toString());
      this.throttledSendInput(ClickAndDragInputType.Move, swipeVector);
    }
  }

  swipeAreaTouchEnd(swipeVector: any) {
    if (this.aiming && this.args.show) {
      this.circle?.setAttribute("cx", "0");
      this.circle?.setAttribute("cy", "0");
      this.circle?.setAttribute("r", "0");
      this.line?.setAttribute("x2", clamp(this.swipeAnalog.end_position.x, 0, this.maxX).toString());
      this.line?.setAttribute("y2", clamp(this.swipeAnalog.end_position.y, 0, this.maxY).toString());
      this.sendInput(ClickAndDragInputType.End, swipeVector);
      this.aiming = false;
    }
  }
}
