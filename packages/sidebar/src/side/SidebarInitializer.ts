import { ShapeUpdater } from "../shapes";
import { DropCheck } from "../drag-drop";
import mx from "@mxgraph-app/mx";
import { Sidebar } from ".";
const { mxClient, mxEvent } = mx;

export class SidebarInitializer {
  sidebar: Sidebar;
  editorUi: any;
  container: any;
  graph: any;

  constructor(sidebar: Sidebar) {
    this.sidebar = sidebar;
    this.editorUi = sidebar.editorUi;
    this.container = sidebar.container;
  }

  get ui() {
    return this.editorUi;
  }

  initialize() {
    this.configure();
    this.appendGraphElemToDocument();
    this.addPointerHandlers();
    this.addScrollHandler();
  }

  appendGraphElemToDocument() {
    document.body.appendChild(this.graph.container);
  }

  configure() {
    this.configureGraph();
    this.configureSideBar();
  }

  configureSideBar() {
    const { sidebar, ui } = this;
    sidebar.shapeUpdater = new ShapeUpdater();
    sidebar.dropCheck = new DropCheck(ui);
    return sidebar;
  }

  configureGraph() {
    const { sidebar, ui, graph } = this;
    const { minThumbStrokeWidth, thumbAntiAlias } = sidebar;
    this.graph = ui.createTemporaryGraph(graph.getStylesheet());
    this.graph.cellRenderer.minSvgStrokeWidth = minThumbStrokeWidth;
    this.graph.cellRenderer.antiAlias = thumbAntiAlias;
    this.graph.container.style.visibility = "hidden";
    this.graph.foldingEnabled = false;
  }

  addScrollHandler() {
    const { sidebar, container } = this;
    // Enables tooltips after scroll
    mxEvent.addListener(container, "scroll", () => {
      sidebar.showTooltips = true;
      sidebar.hideTooltip();
    });
  }

  addPointerHandlers() {
    this.addPointerUpHandler();
    this.addPointerDownHandler();
    this.addPointerMoveHandler();
    this.addPointerOutHandler();
  }

  addPointerMoveHandler() {
    const { sidebar } = this;
    sidebar.pointerMoveHandler = (evt) => {
      var src = mxEvent.getSource(evt);

      while (src != null) {
        if (src == sidebar.currentElt) {
          return;
        }

        src = src.parentNode;
      }

      sidebar.hideTooltip();
    };

    mxEvent.addListener(
      document,
      mxClient.IS_POINTER ? "pointermove" : "mousemove",
      sidebar.pointerMoveHandler
    );
  }

  addPointerOutHandler() {
    const { sidebar } = this;
    // Handles mouse leaving the window
    sidebar.pointerOutHandler = (evt) => {
      if (evt.toElement == null && evt.relatedTarget == null) {
        sidebar.hideTooltip();
      }
    };

    mxEvent.addListener(
      document,
      mxClient.IS_POINTER ? "pointerout" : "mouseout",
      sidebar.pointerOutHandler
    );
  }

  addPointerDownHandler() {
    const { sidebar } = this;
    sidebar.pointerDownHandler = () => {
      sidebar.showTooltips = false;
      sidebar.hideTooltip();
    };

    mxEvent.addListener(
      document,
      mxClient.IS_POINTER ? "pointerdown" : "mousedown",
      sidebar.pointerDownHandler
    );
  }

  addPointerUpHandler() {
    const { sidebar } = this;
    sidebar.pointerUpHandler = () => {
      sidebar.showTooltips = true;
    };

    mxEvent.addListener(
      document,
      mxClient.IS_POINTER ? "pointerup" : "mouseup",
      sidebar.pointerUpHandler
    );
  }
}
