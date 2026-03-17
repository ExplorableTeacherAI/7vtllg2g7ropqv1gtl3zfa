/**
 * Section 6: Complex Substitution Problems
 * ========================================
 *
 * Multi-step problems where students substitute, simplify, and solve.
 * Uses scrollytelling to walk through the solution step by step.
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
    InlineSpotColor,
    InlineFormula,
} from "@/components/atoms";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ─────────────────────────────────────────
// Step-by-Step Solving Visualization
// ─────────────────────────────────────────
function ComplexSolvingVisualization() {
    const x = useVar("complexX", 3) as number;

    // System of equations:
    // y = x + 2
    // 2x + y = 13
    // Substitute: 2x + (x + 2) = 13
    // Simplify: 3x + 2 = 13
    // Solve: 3x = 11, x = 11/3 (but let's use integer-friendly version)

    // Better system for integers:
    // y = x + 2
    // x + y = 7
    // Substitute: x + (x + 2) = 7
    // Simplify: 2x + 2 = 7
    // Solve: 2x = 5 (not integer)

    // Use: y = 2x - 1 and x + y = 8
    // Substitute: x + (2x - 1) = 8
    // Simplify: 3x - 1 = 8
    // Solve: 3x = 9, x = 3
    // Then y = 2(3) - 1 = 5

    const y = 2 * x - 1;
    const targetSum = x + y;
    const substitutedLeft = "x + (2x - 1)";
    const simplified = 3 * x - 1;
    const isSolved = x === 3;

    return (
        <div className="relative">
            <svg
                viewBox="0 0 420 400"
                width="100%"
                height="400"
                className="mx-auto"
                style={{ maxWidth: 420 }}
            >
                {/* System of equations */}
                <rect x="20" y="20" width="380" height="70" rx="12" fill="rgba(142, 144, 245, 0.1)" stroke="#8E90F5" strokeWidth="2" />
                <text x="210" y="45" textAnchor="middle" fontSize="14" fontWeight="600" fill="#8E90F5">
                    System of Equations
                </text>
                <text x="130" y="72" textAnchor="middle" fontSize="18" fill="#1e293b">
                    y = 2x − 1
                </text>
                <text x="290" y="72" textAnchor="middle" fontSize="18" fill="#1e293b">
                    x + y = 8
                </text>

                {/* Step 1: Substitute */}
                <rect x="20" y="110" width="380" height="60" rx="12" fill="rgba(247, 178, 59, 0.1)" stroke="#F7B23B" strokeWidth="2" />
                <text x="40" y="135" fontSize="12" fontWeight="600" fill="#F7B23B">Step 1: Substitute y</text>
                <text x="210" y="155" textAnchor="middle" fontSize="18" fill="#1e293b">
                    x + <tspan fill="#AC8BF9">(2x − 1)</tspan> = 8
                </text>

                {/* Step 2: Simplify */}
                <rect x="20" y="190" width="380" height="60" rx="12" fill="rgba(248, 160, 205, 0.1)" stroke="#F8A0CD" strokeWidth="2" />
                <text x="40" y="215" fontSize="12" fontWeight="600" fill="#F8A0CD">Step 2: Combine like terms</text>
                <text x="210" y="235" textAnchor="middle" fontSize="18" fill="#1e293b">
                    3x − 1 = 8
                </text>

                {/* Step 3: Isolate */}
                <rect x="20" y="270" width="380" height="60" rx="12" fill="rgba(98, 204, 249, 0.1)" stroke="#62CCF9" strokeWidth="2" />
                <text x="40" y="295" fontSize="12" fontWeight="600" fill="#62CCF9">Step 3: Add 1 to both sides</text>
                <text x="210" y="315" textAnchor="middle" fontSize="18" fill="#1e293b">
                    3x = 9
                </text>

                {/* Step 4: Solve */}
                <rect x="20" y="350" width="380" height="45" rx="12" fill={isSolved ? "rgba(34, 197, 94, 0.15)" : "rgba(245, 158, 11, 0.1)"} stroke={isSolved ? "#22c55e" : "#f59e0b"} strokeWidth="2" />
                <text x="40" y="378" fontSize="12" fontWeight="600" fill={isSolved ? "#22c55e" : "#f59e0b"}>Step 4: Divide by 3</text>
                <text x="280" y="378" textAnchor="middle" fontSize="20" fontWeight="bold" fill={isSolved ? "#22c55e" : "#f59e0b"}>
                    x = {x} {isSolved ? "✓" : `(should be 3)`}
                </text>

                {/* Current values sidebar */}
                <g transform="translate(340, 110)">
                    <rect x="0" y="0" width="60" height="35" rx="6" fill="#62D0AD" />
                    <text x="30" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
                        x = {x}
                    </text>
                </g>
                <g transform="translate(340, 155)">
                    <rect x="0" y="0" width="60" height="35" rx="6" fill="#AC8BF9" />
                    <text x="30" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
                        y = {y}
                    </text>
                </g>
                <g transform="translate(340, 200)">
                    <rect x="0" y="0" width="60" height="35" rx="6" fill={targetSum === 8 ? "#22c55e" : "#f59e0b"} />
                    <text x="30" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
                        x+y={targetSum}
                    </text>
                </g>
            </svg>
            <InteractionHintSequence
                hintKey="complex-substitution-solve"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Adjust x to find the solution",
                        position: { x: "88%", y: "32%" },
                    },
                ]}
            />
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive displays
// ─────────────────────────────────────────
function ComputedComplexY() {
    const x = useVar("complexX", 3) as number;
    return <span className="font-semibold text-[#AC8BF9]">{2 * x - 1}</span>;
}

function ComputedSum() {
    const x = useVar("complexX", 3) as number;
    const y = 2 * x - 1;
    return <span className={`font-semibold ${x + y === 8 ? "text-[#22c55e]" : "text-[#f59e0b]"}`}>{x + y}</span>;
}

function SolutionStatus() {
    const x = useVar("complexX", 3) as number;
    const y = 2 * x - 1;
    const sum = x + y;
    if (sum === 8) {
        return <span className="text-[#22c55e] font-semibold">The solution is correct! x = {x} and y = {y}.</span>;
    }
    return <span className="text-[#f59e0b]">x + y = {sum}, but we need 8. Keep adjusting x!</span>;
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const section6Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-complex-title" maxWidth="xl">
        <Block id="complex-title" padding="lg">
            <EditableH2 id="h2-complex-title" blockId="complex-title">
                Complex Substitution Problems
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-complex-intro" maxWidth="xl">
        <Block id="complex-intro" padding="sm">
            <EditableParagraph id="para-complex-intro" blockId="complex-intro">
                Now let us tackle a more challenging problem that combines everything you have learned.
                We have a{" "}
                <InlineTooltip
                    id="tooltip-system-equations"
                    tooltip="A set of two or more equations that must all be satisfied simultaneously by the same values of the variables."
                >
                    system of equations
                </InlineTooltip>
                {" "}with two unknowns, and we will use substitution to find both values. This is the kind
                of problem that looks intimidating at first but becomes manageable when you break it into steps.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The problem
    <StackLayout key="layout-complex-problem" maxWidth="xl">
        <Block id="complex-problem" padding="md">
            <EditableParagraph id="para-complex-problem" blockId="complex-problem">
                <strong>The Problem:</strong> Find x and y if{" "}
                <InlineFormula latex="y = 2x - 1" colorMap={{}} /> and{" "}
                <InlineFormula latex="x + y = 8" colorMap={{}} />.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive solving visualization
    <SplitLayout key="layout-complex-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="complex-explanation" padding="sm">
                <EditableParagraph id="para-complex-explanation" blockId="complex-explanation">
                    The first equation tells us that{" "}
                    <InlineSpotColor varName="yValue" color="#AC8BF9">y</InlineSpotColor>
                    {" "}= 2{" "}
                    <InlineSpotColor varName="complexX" color="#62D0AD">x</InlineSpotColor>
                    {" "}− 1. Since we know what y equals in terms of x, we can substitute this into the
                    second equation. This gives us x + (2x − 1) = 8.
                </EditableParagraph>
            </Block>
            <Block id="complex-steps" padding="sm">
                <EditableParagraph id="para-complex-steps" blockId="complex-steps">
                    Combining like terms: x + 2x − 1 = 3x − 1 = 8. Adding 1 to both sides: 3x = 9.
                    Dividing both sides by 3: x = 3. Try adjusting{" "}
                    <InlineSpotColor varName="complexX" color="#62D0AD">x</InlineSpotColor>
                    {" "}to{" "}
                    <InlineScrubbleNumber
                        varName="complexX"
                        {...numberPropsFromDefinition(getVariableInfo("complexX"))}
                    />{" "}and see if the equations balance!
                </EditableParagraph>
            </Block>
            <Block id="complex-current-values" padding="sm">
                <EditableParagraph id="para-complex-current-values" blockId="complex-current-values">
                    With x ={" "}
                    <InlineScrubbleNumber
                        varName="complexX"
                        {...numberPropsFromDefinition(getVariableInfo("complexX"))}
                    />, we get y = 2 × {" "}
                    <InlineScrubbleNumber
                        varName="complexX"
                        {...numberPropsFromDefinition(getVariableInfo("complexX"))}
                    />{" "}− 1 = <ComputedComplexY />. And x + y = <ComputedSum />. <SolutionStatus />
                </EditableParagraph>
            </Block>
        </div>
        <Block id="complex-visualization" padding="sm" hasVisualization>
            <ComplexSolvingVisualization />
        </Block>
    </SplitLayout>,

    // The key insight
    <StackLayout key="layout-complex-insight" maxWidth="xl">
        <Block id="complex-insight" padding="md">
            <EditableParagraph id="para-complex-insight" blockId="complex-insight">
                <strong>The Key Insight:</strong> Substitution transforms a problem with two unknowns into
                a problem with one unknown. Once we replaced y with (2x − 1), we had an equation with only x,
                which we already know how to solve! After finding x, we can substitute back to find y.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Another example
    <StackLayout key="layout-complex-another-heading" maxWidth="xl">
        <Block id="complex-another-heading" padding="md">
            <EditableParagraph id="para-complex-another-heading" blockId="complex-another-heading">
                <strong>Another Example: Back-Substitution</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-complex-another" maxWidth="xl">
        <Block id="complex-another" padding="sm">
            <EditableParagraph id="para-complex-another" blockId="complex-another">
                Sometimes you need to substitute the answer back to find the other variable. Suppose
                we have y = x + 3 and 2y − x = 11. Substituting y: 2(x + 3) − x = 11 gives us
                2x + 6 − x = 11, so x + 6 = 11, meaning x = 5. Now back-substitute: y = 5 + 3 = 8.
                Check: 2(8) − 5 = 16 − 5 = 11. It works!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment
    <StackLayout key="layout-complex-check-heading" maxWidth="xl">
        <Block id="complex-check-heading" padding="md">
            <EditableParagraph id="para-complex-check-heading" blockId="complex-check-heading">
                <strong>Check Your Understanding</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-complex-question" maxWidth="xl">
        <Block id="complex-question" padding="md">
            <EditableParagraph id="para-complex-question" blockId="complex-question">
                Solve the system: y = x + 2 and x + y = 8. First substitute y in the second equation
                to get x + (x + 2) = 8. This simplifies to 2x + 2 = 8, then 2x = 6. What is x?{" "}
                <InlineFeedback
                    varName="answerComplexSubstitution"
                    correctValue="3"
                    position="standalone"
                    successMessage="Correct! When x = 3, y = 3 + 2 = 5, and indeed 3 + 5 = 8"
                    failureMessage="Not quite!"
                    hint="After simplifying to 2x = 6, divide both sides by 2"
                    reviewBlockId="complex-explanation"
                    reviewLabel="Review the substitution steps"
                >
                    <InlineClozeInput
                        varName="answerComplexSubstitution"
                        correctAnswer="3"
                        {...clozePropsFromDefinition(getVariableInfo("answerComplexSubstitution"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition
    <StackLayout key="layout-complex-transition" maxWidth="xl">
        <Block id="complex-transition" padding="lg">
            <EditableParagraph id="para-complex-transition" blockId="complex-transition">
                Congratulations! You have learned the core techniques of algebra: understanding variables,
                writing expressions, solving equations, and using substitution. Now it is time to put all
                of these skills together in a practice challenge!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
