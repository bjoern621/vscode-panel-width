import * as vscode from "vscode";
import { PanelManager } from "./panelManager";
import { getConfiguration, updateConfiguration } from "./configuration";

export function activate(context: vscode.ExtensionContext) {
    const panelManager = new PanelManager();

    // Apply all sizes command
    const applyAllCommand = vscode.commands.registerCommand(
        "vscode-panel-width.applyAll",
        async () => {
            await panelManager.applyAllSizes();
            vscode.window.showInformationMessage("All panel sizes applied!");
        }
    );

    // Apply primary sidebar size command
    const applyPrimarySidebarCommand = vscode.commands.registerCommand(
        "vscode-panel-width.applyPrimarySidebar",
        async () => {
            const config = getConfiguration();
            await panelManager.setPrimarySidebarSize(config.primarySidebarSize);
            vscode.window.showInformationMessage(
                `Primary sidebar set to size ${config.primarySidebarSize}`
            );
        }
    );

    // Apply secondary sidebar size command
    const applySecondarySidebarCommand = vscode.commands.registerCommand(
        "vscode-panel-width.applySecondarySidebar",
        async () => {
            const config = getConfiguration();
            await panelManager.setSecondarySidebarSize(
                config.secondarySidebarSize
            );
            vscode.window.showInformationMessage(
                `Secondary sidebar set to size ${config.secondarySidebarSize}`
            );
        }
    );

    // Apply panel size command
    const applyPanelSizeCommand = vscode.commands.registerCommand(
        "vscode-panel-width.applyPanelSize",
        async () => {
            const config = getConfiguration();
            await panelManager.setPanelSize(config.panelSize);
            vscode.window.showInformationMessage(
                `Panel set to size ${config.panelSize}`
            );
        }
    );

    // Set primary sidebar size
    const setPrimarySidebarSizeCommand = vscode.commands.registerCommand(
        "vscode-panel-width.setPrimarySidebarSize",
        async () => {
            const config = getConfiguration();
            const input = await vscode.window.showInputBox({
                prompt: "Enter primary sidebar size (1 = minimum, 2 = +1 step, etc.)",
                value: config.primarySidebarSize.toString(),
            });

            if (input) {
                const value = parseInt(input, 10);
                if (!isNaN(value) && value >= 1) {
                    await updateConfiguration("primarySidebar", value);
                    await panelManager.setPrimarySidebarSize(value);
                }
            }
        }
    );

    // Set secondary sidebar size
    const setSecondarySidebarSizeCommand = vscode.commands.registerCommand(
        "vscode-panel-width.setSecondarySidebarSize",
        async () => {
            const config = getConfiguration();
            const input = await vscode.window.showInputBox({
                prompt: "Enter secondary sidebar size (1 = minimum, 2 = +1 step, etc.)",
                value: config.secondarySidebarSize.toString(),
            });

            if (input) {
                const value = parseInt(input, 10);
                if (!isNaN(value) && value >= 1) {
                    await updateConfiguration("secondarySidebar", value);
                    await panelManager.setSecondarySidebarSize(value);
                }
            }
        }
    );

    // Set panel size
    const setPanelSizeCommand = vscode.commands.registerCommand(
        "vscode-panel-width.setPanelSize",
        async () => {
            const config = getConfiguration();
            const input = await vscode.window.showInputBox({
                prompt: "Enter panel size (1 = minimum, 2 = +1 step, etc.)",
                value: config.panelSize.toString(),
            });

            if (input) {
                const value = parseInt(input, 10);
                if (!isNaN(value) && value >= 1) {
                    await updateConfiguration("panel", value);
                    await panelManager.setPanelSize(value);
                }
            }
        }
    );

    context.subscriptions.push(
        applyAllCommand,
        applyPrimarySidebarCommand,
        applySecondarySidebarCommand,
        applyPanelSizeCommand,
        setPrimarySidebarSizeCommand,
        setSecondarySidebarSizeCommand,
        setPanelSizeCommand,
        panelManager
    );

    console.log("Panel Width extension activated!");
}

export function deactivate() {}
