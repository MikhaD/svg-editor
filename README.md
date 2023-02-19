# Idea
A simple SVG (Scalable Vector Graphic) editor, based on [figma](https://www.figma.com/), With the goal of making a VS Code extension. Figma is more of a design tool than an SVG editor, with the result that several of the properties of SVGs are abstracted away (arc) or even not supported (looking at you textPath). I want this to be as close to writing the SVG by hand as possible, with enhancements that simplify things that would take a long time such as converting between absolute & relative coordinates, moving paths around, scaling, etc. I want to provide the option to do things with CSS, such as scaling using the `scale` property instead of changing actual coordinates to make the SVG as neat as possible.

I frequently find myself hand modifying SVGs I have exported from figma for my notes because they are poorly optimized, with values that have 3-4 decimal places. I often resort to just redrawing the SVG from scratch by hand. My goal with this editor is to speed up that process.
## Goals
- [ ] Create a basic SVG editor
- [ ] Convert the editor to a VS Code extension
- [ ] Move as much of the logic into Rust WASM as possible
# Technical Details
- Add `data-block-shortcuts="true"` to an element to prevent active shortcuts from triggering while it is focused. input elements have this by default, but you can disable it by setting their `data-block-shortcuts` attribute to `false`.
- A keyboard shortcut's keys are specified in a combo string for ease of use. Use the `default_combo` property to set the combo.