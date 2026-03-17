/**
 * Section 4: Equations with Variables on Both Sides
 * ==================================================
 *
 * When x appears on both sides of the equation, how do we isolate it?
 * Features an interactive visualization showing the collection process.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineFeedback,
    InlineTooltip,
    InlineFormula,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    scrubVarsFromDefinitions,
} from "../variables";
import { useVar } from "@/stores";

// ─────────────────────────────────────────
// Both Sides Visualization
// ─────────────────────────────────────────
function BothSidesVisualization() {
    const leftCoef = useVar("leftCoefficient", 3) as number;
    const rightCoef = useVar("rightCoefficient", 1) as number;
    const leftConst = useVar("leftConstant", 4) as number;
    const rightConst = useVar("rightConstant", 12) as number;

    // Solve the equation: leftCoef*x + leftConst = rightCoef*x + rightConst
    // (leftCoef - rightCoef)*x = rightConst - leftConst
    // x = (rightConst - leftConst) / (leftCoef - rightCoef)
    const coeffDiff = leftCoef - rightCoef;
    const constDiff = rightConst - leftConst;
    const solution = coeffDiff !== 0 ? constDiff / coeffDiff : 0;
    const hasSolution = coeffDiff !== 0 && Number.isInteger(solution) && solution > 0;

    return (
        <div className="relative">
            <svg
                viewBox="0 0 420 320"
                width="100%"
                height="320"
                className="mx-auto"
                style={{ maxWidth: 420 }}
            >
                {/* Background boxes for each side */}
                <rect x="20" y="50" width="170" height="120" rx="12" fill="rgba(142, 144, 245, 0.1)" stroke="#8E90F5" strokeWidth="2" />
                <rect x="230" y="50" width="170" height="120" rx="12" fill="rgba(247, 178, 59, 0.1)" stroke="#F7B23B" strokeWidth="2" />

                {/* Equals sign in center */}
                <text x="210" y="120" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#64748b">
                    =
                </text>

                {/* Left side: coefficient × x boxes */}
                <g transform="translate(30, 70)">
                    {Array.from({ length: Math.min(leftCoef, 5) }).map((_, i) => (
                        <g key={`left-x-${i}`}>
                            <rect
                                x={i * 32}
                                y={0}
                                width="28"
                                height="35"
                                rx="4"
                                fill="#8E90F5"
                            />
                            <text
                                x={i * 32 + 14}
                                y={24}
                                textAnchor="middle"
                                fontSize="16"
                                fontWeight="bold"
                                fill="white"
                            >
                                x
                            </text>
                        </g>
                    ))}
                    {leftCoef > 5 && (
                        <text x="165" y="24" fontSize="14" fill="#8E90F5">+{leftCoef - 5}...</text>
                    )}
                </g>

                {/* Left side: constant */}
                <g transform="translate(30, 115)">
                    <rect x="0" y="0" width="50" height="35" rx="4" fill="#F8A0CD" />
                    <text x="25" y="24" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
                        +{leftConst}
                    </text>
                </g>

                {/* Right side: coefficient × x boxes */}
                <g transform="translate(240, 70)">
                    {Array.from({ length: Math.min(rightCoef, 5) }).map((_, i) => (
                        <g key={`right-x-${i}`}>
                            <rect
                                x={i * 32}
                                y={0}
                                width="28"
                                height="35"
                                rx="4"
                                fill="#F7B23B"
                            />
                            <text
                                x={i * 32 + 14}
                                y={24}
                                textAnchor="middle"
                                fontSize="16"
                                fontWeight="bold"
                                fill="white"
                            >
                                x
                            </text>
                        </g>
                    ))}
                    {rightCoef > 5 && (
                        <text x="165" y="24" fontSize="14" fill="#F7B23B">+{rightCoef - 5}...</text>
                    )}
                </g>

                {/* Right side: constant */}
                <g transform="translate(240, 115)">
                    <rect x="0" y="0" width="50" height="35" rx="4" fill="#A8D5A2" />
                    <text x="25" y="24" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
                        +{rightConst}
                    </text>
                </g>

                {/* Labels */}
                <text x="105" y="45" textAnchor="middle" fontSize="14" fontWeight="600" fill="#8E90F5">
                    Left Side
                </text>
                <text x="315" y="45" textAnchor="middle" fontSize="14" fontWeight="600" fill="#F7B23B">
                    Right Side
                </text>

                {/* Arrow and solution area */}
                <path d="M 210 180 L 210 210" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />

                <defs>
                    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                    </marker>
                </defs>

                {/* Solution steps */}
                <rect x="60" y="220" width="300" height="80" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" />

                <text x="210" y="245" textAnchor="middle" fontSize="14" fill="#64748b">
                    Collect x terms: ({leftCoef} − {rightCoef})x = {rightConst} − {leftConst}
                </text>
                <text x="210" y="270" textAnchor="middle" fontSize="14" fill="#64748b">
                    Simplify: {coeffDiff}x = {constDiff}
                </text>
                <text x="210" y="295" textAnchor="middle" fontSize="18" fontWeight="bold" fill={hasSolution ? "#22c55e" : "#f59e0b"}>
                    {hasSolution ? `x = ${solution}` : coeffDiff === 0 ? "No solution (coefficients equal)" : `x = ${solution.toFixed(2)}`}
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="both-sides-coefficients"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag to change the coefficients",
                        position: { x: "50%", y: "12%" },
                    },
                ]}
            />
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive solution display
// ─────────────────────────────────────────
function ComputedSolution() {
    const leftCoef = useVar("leftCoefficient", 3) as number;
    const rightCoef = useVar("rightCoefficient", 1) as number;
    const leftConst = useVar("leftConstant", 4) as number;
    const rightConst = useVar("rightConstant", 12) as number;

    const coeffDiff = leftCoef - rightCoef;
    const constDiff = rightConst - leftConst;
    const solution = coeffDiff !== 0 ? constDiff / coeffDiff : 0;

    if (coeffDiff === 0) {
        return <span className="text-[#f59e0b]">undefined (coefficients are equal)</span>;
    }

    return <span className="font-semibold text-[#22c55e]">{solution}</span>;
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const section4Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-bothsides-title" maxWidth="xl">
        <Block id="bothsides-title" padding="lg">
            <EditableH2 id="h2-bothsides-title" blockId="bothsides-title">
                Equations with Variables on Both Sides
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-bothsides-intro" maxWidth="xl">
        <Block id="bothsides-intro" padding="sm">
            <EditableParagraph id="para-bothsides-intro" blockId="bothsides-intro">
                Sometimes x appears on both sides of an equation, like{" "}
                <InlineFormula latex="3x + 4 = x + 12" colorMap={{}} />.
                This looks tricky at first, but the solution is elegant: we{" "}
                <InlineTooltip
                    id="tooltip-collect-terms"
                    tooltip="Moving all terms with x to one side and all numbers to the other side."
                >
                    collect like terms
                </InlineTooltip>
                {" "}by moving all the x terms to one side and all the constants to the other.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The strategy
    <StackLayout key="layout-bothsides-strategy" maxWidth="xl">
        <Block id="bothsides-strategy" padding="sm">
            <EditableParagraph id="para-bothsides-strategy" blockId="bothsides-strategy">
                The strategy is to subtract the smaller x term from both sides. In 3x + 4 = x + 12,
                we subtract x from both sides to get 2x + 4 = 12. Now we are back to a familiar equation!
                We can subtract 4 from both sides to get 2x = 8, then divide both sides by 2 to find x = 4.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization
    <SplitLayout key="layout-bothsides-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="bothsides-explanation" padding="sm">
                <EditableParagraph id="para-bothsides-explanation" blockId="bothsides-explanation">
                    Explore how changing the coefficients and constants affects the solution. The left side
                    has{" "}
                    <InlineScrubbleNumber
                        varName="leftCoefficient"
                        {...numberPropsFromDefinition(getVariableInfo("leftCoefficient"))}
                    />x +{" "}
                    <InlineScrubbleNumber
                        varName="leftConstant"
                        {...numberPropsFromDefinition(getVariableInfo("leftConstant"))}
                    />, and the right side has{" "}
                    <InlineScrubbleNumber
                        varName="rightCoefficient"
                        {...numberPropsFromDefinition(getVariableInfo("rightCoefficient"))}
                    />x +{" "}
                    <InlineScrubbleNumber
                        varName="rightConstant"
                        {...numberPropsFromDefinition(getVariableInfo("rightConstant"))}
                    />.
                </EditableParagraph>
            </Block>
            <Block id="bothsides-result" padding="sm">
                <EditableParagraph id="para-bothsides-result" blockId="bothsides-result">
                    After collecting terms and solving, x = <ComputedSolution />. Notice how the solution
                    changes as you adjust the numbers. Try making the coefficients equal and see what happens!
                </EditableParagraph>
            </Block>
            <Block id="bothsides-formula" padding="sm">
                <FormulaBlock
                    latex="\clr{leftc}{\scrub{leftCoefficient}}x + \clr{leftk}{\scrub{leftConstant}} = \clr{rightc}{\scrub{rightCoefficient}}x + \clr{rightk}{\scrub{rightConstant}}"
                    variables={scrubVarsFromDefinitions(["leftCoefficient", "leftConstant", "rightCoefficient", "rightConstant"])}
                    colorMap={{ leftc: "#8E90F5", leftk: "#F8A0CD", rightc: "#F7B23B", rightk: "#A8D5A2" }}
                />
            </Block>
        </div>
        <Block id="bothsides-visualization" padding="sm" hasVisualization>
            <BothSidesVisualization />
        </Block>
    </SplitLayout>,

    // Worked example
    <StackLayout key="layout-bothsides-worked-heading" maxWidth="xl">
        <Block id="bothsides-worked-heading" padding="md">
            <EditableParagraph id="para-bothsides-worked-heading" blockId="bothsides-worked-heading">
                <strong>Worked Example: Step by Step</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bothsides-worked" maxWidth="xl">
        <Block id="bothsides-worked" padding="sm">
            <EditableParagraph id="para-bothsides-worked" blockId="bothsides-worked">
                Let us solve 3x + 4 = x + 12 together. Step 1: Subtract x from both sides gives
                2x + 4 = 12. Step 2: Subtract 4 from both sides gives 2x = 8. Step 3: Divide both
                sides by 2 gives x = 4. Check: 3(4) + 4 = 12 + 4 = 16, and 4 + 12 = 16. Both sides
                equal 16, so our answer is correct!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment
    <StackLayout key="layout-bothsides-check-heading" maxWidth="xl">
        <Block id="bothsides-check-heading" padding="md">
            <EditableParagraph id="para-bothsides-check-heading" blockId="bothsides-check-heading">
                <strong>Check Your Understanding</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bothsides-question" maxWidth="xl">
        <Block id="bothsides-question" padding="md">
            <EditableParagraph id="para-bothsides-question" blockId="bothsides-question">
                Solve the equation 5x + 2 = 3x + 10. First subtract 3x from both sides to get 2x + 2 = 10.
                Then subtract 2 to get 2x = 8. Finally divide by 2. The value of x is{" "}
                <InlineFeedback
                    varName="answerBothSides"
                    correctValue="4"
                    position="terminal"
                    successMessage="— well done! You correctly collected terms and isolated x"
                    failureMessage="— not quite"
                    hint="After subtracting 3x from both sides, you get 2x + 2 = 10. Then subtract 2 and divide by 2"
                    reviewBlockId="bothsides-worked"
                    reviewLabel="Review the worked example"
                >
                    <InlineClozeInput
                        varName="answerBothSides"
                        correctAnswer="4"
                        {...clozePropsFromDefinition(getVariableInfo("answerBothSides"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition
    <StackLayout key="layout-bothsides-transition" maxWidth="xl">
        <Block id="bothsides-transition" padding="lg">
            <EditableParagraph id="para-bothsides-transition" blockId="bothsides-transition">
                Excellent! You can now solve equations even when x appears on both sides. But here is where
                algebra gets really powerful: what if we have two different variables, and we know a
                relationship between them? This is called substitution, and it lets us solve problems
                that seem impossible at first glance.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
