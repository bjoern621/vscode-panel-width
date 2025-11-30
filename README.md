# vscode-panel-width

Set preferred sizes for VS Code sidebars and panel using simple step numbers.

## Installation

### From VSIX (Recommended)

1. Download or build the `.vsix` file
2. In VS Code, press `Ctrl+Shift+P`
3. Type `Extensions: Install from VSIX...`
4. Select the `.vsix` file

Or via command line:

```bash
code --install-extension vscode-panel-width-0.2.0.vsix
```

### Build from Source

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/vscode-panel-width.git
    cd vscode-panel-width
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Package the extension:
    ```bash
    npx vsce package --allow-missing-repository
    ```
4. Install the generated `.vsix` file (see above)

### Development

1. Open the project in VS Code
2. Run `npm install`
3. Press `F5` to launch Extension Development Host

## Usage

Use the Command Palette (`Ctrl+Shift+P`) and search for "Panel Width" commands.

### Commands

| Command                                     | Description                        |
| ------------------------------------------- | ---------------------------------- |
| `Panel Width: Apply All Sizes`              | Apply all configured sizes at once |
| `Panel Width: Apply Primary Sidebar Size`   | Apply left sidebar size            |
| `Panel Width: Apply Secondary Sidebar Size` | Apply right sidebar size           |
| `Panel Width: Apply Panel Size`             | Apply bottom panel size            |
| `Panel Width: Set Primary Sidebar Size`     | Set and apply left sidebar size    |
| `Panel Width: Set Secondary Sidebar Size`   | Set and apply right sidebar size   |
| `Panel Width: Set Panel Size`               | Set and apply bottom panel size    |

## Configuration

Settings can be configured in VS Code Settings (`Ctrl+,`) under "Panel Width".

| Setting                       | Default | Description                         |
| ----------------------------- | ------- | ----------------------------------- |
| `panelWidth.primarySidebar`   | `5`     | Size of left sidebar (1 = minimum)  |
| `panelWidth.secondarySidebar` | `8`     | Size of right sidebar (1 = minimum) |
| `panelWidth.panel`            | `5`     | Size of bottom panel (1 = minimum)  |

### How Sizes Work

-   `1` = minimum size
-   `2` = minimum + 1 step
-   `3` = minimum + 2 steps
-   etc.

Each step is approximately 60 pixels.

## License

MIT
