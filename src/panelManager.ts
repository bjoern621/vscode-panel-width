import * as vscode from "vscode";
import { getConfiguration } from "./configuration";

// Number of decrease commands to ensure we hit minimum
const SHRINK_ITERATIONS = 50;

export class PanelManager implements vscode.Disposable {
    private disposables: vscode.Disposable[] = [];

    constructor() {
        this.disposables.push(
            vscode.workspace.onDidChangeConfiguration(
                this.onConfigurationChange.bind(this)
            )
        );
    }

    private onConfigurationChange(e: vscode.ConfigurationChangeEvent): void {
        if (e.affectsConfiguration("panelWidth")) {
            vscode.window
                .showInformationMessage(
                    "Panel Width settings changed. Apply new sizes?",
                    "Apply Now"
                )
                .then((action) => {
                    if (action === "Apply Now") {
                        this.applyAllSizes();
                    }
                });
        }
    }

    public async applyAllSizes(): Promise<void> {
        const config = getConfiguration();
        await this.setPrimarySidebarSize(config.primarySidebarSize);
        await this.setSecondarySidebarSize(config.secondarySidebarSize);
        await this.setPanelSize(config.panelSize);
        // Return focus to editor
        await vscode.commands.executeCommand(
            "workbench.action.focusActiveEditorGroup"
        );
    }

    /**
     * Set primary sidebar size using step numbers.
     * @param size Step number: 1 = minimum size, 2 = +1 increment, 3 = +2 increments, etc.
     */
    public async setPrimarySidebarSize(size: number): Promise<void> {
        try {
            // Focus the primary sidebar (left)
            await vscode.commands.executeCommand(
                "workbench.action.focusSideBar"
            );
            await this.delay(50);

            // Shrink to minimum
            for (let i = 0; i < SHRINK_ITERATIONS; i++) {
                await vscode.commands.executeCommand(
                    "workbench.action.decreaseViewSize"
                );
            }
            await this.delay(50);

            // Size 1 = minimum (0 increments), size 2 = 1 increment, etc.
            const steps = Math.max(0, size - 1);
            for (let i = 0; i < steps; i++) {
                await vscode.commands.executeCommand(
                    "workbench.action.increaseViewSize"
                );
            }

            console.log(
                `Primary sidebar set to size ${size} (${steps} steps from minimum)`
            );
        } catch (e) {
            console.error("Failed to set primary sidebar size:", e);
        }
    }

    /**
     * Set secondary sidebar size using step numbers.
     * @param size Step number: 1 = minimum size, 2 = +1 increment, 3 = +2 increments, etc.
     */
    public async setSecondarySidebarSize(size: number): Promise<void> {
        try {
            // Focus the secondary sidebar (right) - this is the Auxiliary Bar
            await vscode.commands.executeCommand(
                "workbench.action.focusAuxiliaryBar"
            );
            await this.delay(50);

            // Shrink to minimum
            for (let i = 0; i < SHRINK_ITERATIONS; i++) {
                await vscode.commands.executeCommand(
                    "workbench.action.decreaseViewSize"
                );
            }
            await this.delay(50);

            // Size 1 = minimum (0 increments), size 2 = 1 increment, etc.
            const steps = Math.max(0, size - 1);
            for (let i = 0; i < steps; i++) {
                await vscode.commands.executeCommand(
                    "workbench.action.increaseViewSize"
                );
            }

            console.log(
                `Secondary sidebar set to size ${size} (${steps} steps from minimum)`
            );
        } catch (e) {
            console.error("Failed to set secondary sidebar size:", e);
        }
    }

    /**
     * Set panel size using step numbers.
     * @param size Step number: 1 = minimum size, 2 = +1 increment, 3 = +2 increments, etc.
     */
    public async setPanelSize(size: number): Promise<void> {
        try {
            // Focus the panel first
            await vscode.commands.executeCommand("workbench.action.focusPanel");
            await this.delay(50);

            // Shrink to minimum
            for (let i = 0; i < SHRINK_ITERATIONS; i++) {
                await vscode.commands.executeCommand(
                    "workbench.action.decreaseViewSize"
                );
            }
            await this.delay(50);

            // Size 1 = minimum (0 increments), size 2 = 1 increment, etc.
            const steps = Math.max(0, size - 1);
            for (let i = 0; i < steps; i++) {
                await vscode.commands.executeCommand(
                    "workbench.action.increaseViewSize"
                );
            }

            console.log(
                `Panel set to size ${size} (${steps} steps from minimum)`
            );
        } catch (e) {
            console.error("Failed to set panel size:", e);
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise((r) => setTimeout(r, ms));
    }

    public dispose(): void {
        this.disposables.forEach((d) => d.dispose());
    }
}
