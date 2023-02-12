# Idea
A simple vector graphics editor. I frequently find myself hand modifying SVGs I have exported from figma for my notes because they are poorly optimized, with values that have 3-4 decimal places. I often resort to just redrawing the SVG from scratch by hand. My goal with this editor is to speed up that process.
## Goals
- Simple SVG editor to make making simple SVG diagrams for my notes easier
- If this works out I would like to integrate this into an obsidian plugin & maybe even a VS Code extension
- If this works out I may want to consider moving as much of the logic into Rust WASM as possible
# To Do
- [ ] All actions need to be added to a stack with an undo/redo function
- [ ] Get the damn cursors working
- [ ] Figure out how to snap to svg points using one of the TOA algorithms
- [ ] Add tooltip system from muscles project
- [ ] Add shape tool & think about how to go about making sub states for the different shapes. Sub states are likely going to be very important, think move when a shape is selected vs not.
- [ ] Think about how to do alignment snapping