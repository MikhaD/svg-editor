# Idea
A simple vector graphics editor. I frequently find myself hand modifying SVGs I have exported from figma for my notes because they are poorly optimized, with values that have 3-4 decimal places. I often resort to just redrawing the SVG from scratch by hand. My goal with this editor is to speed up that process.
## Goals
- Simple SVG editor to make making simple SVG diagrams for my notes easier
- If this works out I would like to integrate this into an obsidian plugin & maybe even a VS Code extension
- If this works out I may want to consider moving as much of the logic into Rust WASM as possible
# Technical Details
- Add `data-block-shortcuts="true"` to an element to prevent active shortcuts from triggering while it is focused. input elements have this by default, but you can disable it by setting their `data-block-shortcuts` attribute to `false`.