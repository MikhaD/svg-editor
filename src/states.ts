interface States {
	move: Move,
	draw: Draw,
}

type StateName = keyof States;

import { writable } from "svelte/store";
import { Shortcut } from "./utils";
export const state = writable<State>();

export class StateMachine {
	state: State;
	stateName: StateName;
	states: States;
	constructor(state: StateName = "move") {
		this.states = {
			move: new Move(),
			draw: new Draw(),
		};
		this.transition(state);
	}

	transition(name: StateName) {
		if (this.state) {
			if (this.state.name === name) return;
			this.state.onStateExit();
		}
		this.stateName = name;
		this.state = this.states[name];
		state.set(this.state);
		this.state.onStateEnter();
	}
}

export abstract class State {
	name: StateName;
	icon: string;
	shortcuts: Shortcut[] = [];
	constructor(name: StateName) {
		this.name = name;
	}
	abstract onStateEnter(): void;
	abstract onStateExit(): void;
	abstract onMouseDown(e: MouseEvent): void;
	abstract onMouseUp(e: MouseEvent): void;
	abstract onMouseMove(e: MouseEvent): void;
	abstract onKeyPress(e: KeyboardEvent): void;
	/** A dummy function that other functions can be set to in sub classes */
	noop(): void { };
}

export class Move extends State {
	constructor() {
		super("move");
		this.icon = "M82.816 238.634l52.651-79.545 90.268-24.504L37.917 21.049l44.9 217.585zm107.122-109.07L58.425 50.062l31.403 152.206 36.736-55.495 63.374-17.209z";
	}
	onStateEnter() {
		console.log("Move state entered");
	}
	onStateExit() {
		console.log("Move state exited");
	}
	onMouseDown(e: MouseEvent) {
		console.log("Move state mouse down");
	}
	onMouseUp(e: MouseEvent) {
		console.log("Move state mouse up");
	}
	onMouseMove(e: MouseEvent) {
		console.log("Move state mouse move");
	}
	onKeyPress(e: KeyboardEvent) {
		console.log("Move state key press");
	}
}

export class Draw extends State {
	constructor() {
		super("draw");
		this.icon = "M188.843 238.62l50.289-50.275-36.579-36.58c2.375-7.495 3.669-15.488 3.669-23.765 0-36.409-24.86-66.987-58.524-75.719L14.222 14.222l37.163 129.65c7.353 35.584 38.855 62.35 76.615 62.35 8.562 0 16.811-1.379 24.519-3.925l36.324 36.323zM144.114 66.048L48.981 38.926l69.817 69.817a21.24 21.24 0 0 1 9.202-2.076c11.776 0 21.333 9.557 21.333 21.333s-9.557 21.333-21.333 21.333-21.333-9.557-21.333-21.333a21.24 21.24 0 0 1 2.076-9.202L39.012 49.067l26.311 91.932C71.324 170.112 97.124 192 128 192c7.396.043 13.397-.967 20.068-3.2l8.32-2.745 6.186 6.187 26.283 26.268 30.151-30.165-26.524-26.539-6.116-6.115 2.631-8.249c2.105-6.471 3.044-12.288 3.001-19.442 0-29.767-20.309-54.812-47.886-61.952z";
		this.shortcuts = [
			new Shortcut({
				default_combo: "Escape",
				description: "Cancel drawing",
				callback: () => FSM.transition("move"),
			}),
		];
	}
	onStateEnter() {
		console.log("Draw state entered");
	}
	onStateExit() {
		console.log("Draw state exited");
	}
	onMouseDown(e: MouseEvent) {
		console.log("Draw state mouse down");
	}
	onMouseUp(e: MouseEvent) {
		console.log("Draw state mouse up");
	}
	onMouseMove(e: MouseEvent) {
		console.log("Draw state mouse move");
	}
	onKeyPress(e: KeyboardEvent) {
		for (let shortcut of this.shortcuts) {
			shortcut.try(e);
		}
	}
}

export const FSM = new StateMachine("move");