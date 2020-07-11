import mx from "@mxgraph-app/mx";
const { mxClient, mxEvent } = mx;

import { Sidebar } from "../Sidebar";

export class SidebarDestroyer {
  sidebar: Sidebar;
  editorUi: any;
  pointerUpHandler: any;
  pointerMoveHandler: any;
  pointerDownHandler: any;
  pointerOutHandler: any;

  constructor(sidebar: Sidebar) {
    this.sidebar = sidebar;
    this.editorUi = sidebar.editorUi;
    const {
      pointerMoveHandler,
      pointerUpHandler,
      pointerDownHandler,
      pointerOutHandler,
    } = sidebar;
    this.pointerUpHandler = pointerUpHandler;
    this.pointerMoveHandler = pointerMoveHandler;
    this.pointerDownHandler = pointerDownHandler;
    this.pointerOutHandler = pointerOutHandler;
  }

  get graph() {
    return this.sidebar.graph;
  }

  destroy() {
    if (this.graph != null) {
      if (
        this.graph.container != null &&
        this.graph.container.parentNode != null
      ) {
        this.graph.container.parentNode.removeChild(this.graph.container);
      }
      // destroy and remove the graph
      this.graph.destroy();
      this.editorUi.graph = null;
    }

    if (this.pointerUpHandler != null) {
      mxEvent.removeListener(
        document,
        mxClient.IS_POINTER ? "pointerup" : "mouseup",
        this.pointerUpHandler
      );
      this.pointerUpHandler = null;
    }

    if (this.pointerDownHandler != null) {
      mxEvent.removeListener(
        document,
        mxClient.IS_POINTER ? "pointerdown" : "mousedown",
        this.pointerDownHandler
      );
      this.pointerDownHandler = null;
    }

    if (this.pointerMoveHandler != null) {
      mxEvent.removeListener(
        document,
        mxClient.IS_POINTER ? "pointermove" : "mousemove",
        this.pointerMoveHandler
      );
      this.pointerMoveHandler = null;
    }

    if (this.pointerOutHandler != null) {
      mxEvent.removeListener(
        document,
        mxClient.IS_POINTER ? "pointerout" : "mouseout",
        this.pointerOutHandler
      );
      this.pointerOutHandler = null;
    }
  }
}
