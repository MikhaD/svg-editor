type Side = "right" | "left";
type Cursor = "default" | "none" | "help" | "pointer" | "progress" | "wait" | "crosshair" | "text" | "vertical-text" | "copy" | "move" | "no-drop" | "not-allowed" | "grab" | "grabbing" | "col-resize" | "row-resize" | "n-resize" | "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize" | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-out";
type DialogueClose = Event & { currentTarget: EventTarget & HTMLDialogElement; };
