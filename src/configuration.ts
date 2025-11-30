import * as vscode from "vscode";

export interface PanelWidthConfiguration {
    primarySidebarSize: number; // Step number: 1 = minimum, 2 = +1 step, etc.
    secondarySidebarSize: number;
    panelSize: number;
}

export function getConfiguration(): PanelWidthConfiguration {
    const config = vscode.workspace.getConfiguration("panelWidth");
    return {
        primarySidebarSize: config.get<number>("primarySidebar", 5),
        secondarySidebarSize: config.get<number>("secondarySidebar", 8),
        panelSize: config.get<number>("panel", 5),
    };
}

export async function updateConfiguration(
    key: string,
    value: number
): Promise<void> {
    const config = vscode.workspace.getConfiguration("panelWidth");
    await config.update(key, value, vscode.ConfigurationTarget.Global);
}
