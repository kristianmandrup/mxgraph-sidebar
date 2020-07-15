import mx from "@mxgraph-app/mx";
const { mxRectangle } = mx;

export class BoxDirections {
  processor: any;

  constructor(processor: any) {
    this.processor = processor;
  }

  addBoxDirections() {
    this.bboxDown();
    this.bboxUp();
    this.bboxLeft();
    this.bboxRight();
  }

  bboxUp() {
    const { dropArrow, bds, bbox, currentTargetState, x, y } = this.processor;
    const { checkArrow, arrowUp, triangleUp } = dropArrow;

    bbox.add(
      checkArrow(
        x,
        y,
        new mxRectangle(
          currentTargetState.getCenterX() - triangleUp.width / 2,
          bds.y - triangleUp.height,
          triangleUp.width,
          triangleUp.height
        ),
        arrowUp
      )
    );
  }

  bboxRight() {
    const { dropArrow, bds, bbox, currentTargetState, x, y } = this.processor;
    const { checkArrow, arrowRight, triangleRight } = dropArrow;

    bbox.add(
      checkArrow(
        x,
        y,
        new mxRectangle(
          bds.x + bds.width,
          currentTargetState.getCenterY() - triangleRight.height / 2,
          triangleRight.width,
          triangleRight.height
        ),
        arrowRight
      )
    );
  }

  bboxDown() {
    const { dropArrow, bds, bbox, currentTargetState, x, y } = this.processor;
    const { checkArrow, arrowDown, triangleDown } = dropArrow;

    bbox.add(
      checkArrow(
        x,
        y,
        new mxRectangle(
          currentTargetState.getCenterX() - triangleDown.width / 2,
          bds.y + bds.height,
          triangleDown.width,
          triangleDown.height
        ),
        arrowDown
      )
    );
  }

  bboxLeft() {
    const { dropArrow, bds, bbox, currentTargetState, x, y } = this.processor;
    const { checkArrow, arrowLeft, triangleLeft } = dropArrow;

    bbox.add(
      checkArrow(
        x,
        y,
        new mxRectangle(
          bds.x - triangleLeft.width,
          currentTargetState.getCenterY() - triangleLeft.height / 2,
          triangleLeft.width,
          triangleLeft.height
        ),
        arrowLeft
      )
    );
  }
}
