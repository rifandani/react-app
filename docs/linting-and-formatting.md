# Linting and Formatting

## Biome

Biome is a all-in-one javascript tooling. It's built on Rust, so it's really fast. This repo actually implements eslint and prettier before migrating it to biome, and I saw a significant upgrade to the speed.

In vscode, make sure you disable your ESLint and Prettier extensions, and install/enable Biome extension instead. You can override the linting and formatting rules in `biome.json` file in the root folder.