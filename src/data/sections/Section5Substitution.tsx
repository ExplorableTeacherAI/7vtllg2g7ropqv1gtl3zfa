/**
 * Section 5: Introduction to Substitution
 * ========================================
 *
 * Replace one variable with its equivalent expression.
 * The key insight: if we know y = 2x, we can swap them!
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
import { FormulaBlock } from "@/components/molecules";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    scrubVarsFromDefinitions,
} from "../variables";
import { useVar } from "@/stores";

// ─────────────────────────────────────────
// Substitution Visualization
// ─────────────────────────────────────────
function SubstitutionVisualization() {
    const xValue = useVar("substitutionX", 2) as number;
    const yValue = 2 * xValue; // y = 2x

    return (
        <div className="relative">
            <svg
                viewBox="0 0 400 340"
                width="100%"
                height="340"
                className="mx-auto"
                style={{ maxWidth: 400 }}
            >
                {/* Title */}
                <text x="200" y="30" textAnchor="middle" fontSize="16" fontWeight="600" fill="#64748b">
                    Substitution: Replace y with 2x
                </text>

                {/* Original equation box */}
                <rect x="50" y="50" width="300" height="60" rx="12" fill="rgba(142, 144, 245, 0.1)" stroke="#8E90F5" strokeWidth="2" />
                <text x="200" y="70" textAnchor="middle" fontSize="14" fill="#64748b">Original Expression</text>
                <text x="200" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e293b">
                    y + 3
                </text>

                {/* Arrow down */}
                <path d="M 200 115 L 200 145" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow3)" />
                <text x="260" y="135" fontSize="12" fill="#64748b">Since y = 2x</text>

                {/* Substituted equation box */}
                <rect x="50" y="150" width="300" height="60" rx="12" fill="rgba(172, 139, 249, 0.1)" stroke="#AC8BF9" strokeWidth="2" />
                <text x="200" y="170" textAnchor="middle" fontSize="14" fill="#64748b">After Substitution</text>
                <text x="200" y="195" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e293b">
                    <tspan fill="#AC8BF9">2x</tspan> + 3
                </text>

                {/* Arrow down */}
                <path d="M 200 215 L 200 245" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow3)" />
                <text x="260" y="235" fontSize="12" fill="#64748b">When x = {xValue}</text>

                {/* Result box */}
                <rect x="50" y="250" width="300" height="70" rx="12" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" />
                <text x="200" y="275" textAnchor="middle" fontSize="14" fill="#64748b">Calculated Value</text>

                {/* Calculation steps */}
                <text x="200" y="300" textAnchor="middle" fontSize="18" fill="#64748b">
                    2 × <tspan fill="#62D0AD" fontWeight="bold">{xValue}</tspan> + 3 = {2 * xValue} + 3 = <tspan fill="#22c55e" fontWeight="bold">{yValue + 3}</tspan>
                </text>

                {/* Arrow marker */}
                <defs>
                    <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                    </marker>
                </defs>

                {/* Variable boxes at bottom */}
                <g transform="translate(80, 325)">
                    <rect x="0" y="0" width="70" height="30" rx="6" fill="#62D0AD" />
                    <text x="35" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
                        x = {xValue}
                    </text>
                </g>
                <g transform="translate(165, 325)">
                    <rect x="0" y="0" width="70" height="30" rx="6" fill="#AC8BF9" />
                    <text x="35" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
                        y = {yValue}
                    </text>
                </g>
                <g transform="translate(250, 325)">
                    <rect x="0" y="0" width="70" height="30" rx="6" fill="#22c55e" />
                    <text x="35" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
                        = {yValue + 3}
                    </text>
                </g>
            </svg>
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive displays
// ─────────────────────────────────────────
function ComputedY() {
    const x = useVar("substitutionX", 2) as number;
    return <span className="font-semibold text-[#AC8BF9]">{2 * x}</span>;
}

function SubstitutionResult() {
    const x = useVar("substitutionX", 2) as number;
    const y = 2 * x;
    return <span className="font-semibold text-[#22c55e]">{y + 3}</span>;
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const section5Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-substitution-title" maxWidth="xl">
        <Block id="substitution-title" padding="lg">
            <EditableH2 id="h2-substitution-title" blockId="substitution-title">
                Introduction to Substitution
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-substitution-intro" maxWidth="xl">
        <Block id="substitution-intro" padding="sm">
            <EditableParagraph id="para-substitution-intro" blockId="substitution-intro">
                <InlineTooltip
                    id="tooltip-substitution"
                    tooltip="Replacing a variable with an equivalent expression or value."
                >
                    Substitution
                </InlineTooltip>
                {" "}is one of algebra's most powerful techniques. The idea is simple: if we know that
                two things are equal, we can replace one with the other. If y = 2x, then anywhere we
                see y, we can write 2x instead. They mean exactly the same thing!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Why substitution works
    <StackLayout key="layout-substitution-why" maxWidth="xl">
        <Block id="substitution-why" padding="sm">
            <EditableParagraph id="para-substitution-why" blockId="substitution-why">
                Substitution works because of the fundamental property of equality: if two things are
                equal, you can always swap one for the other without changing the truth. Think of it
                like exchanging currency: if 1 dollar equals 100 cents, you can replace "1 dollar" with
                "100 cents" in any calculation and get the same result.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive substitution
    <SplitLayout key="layout-substitution-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="substitution-explanation" padding="sm">
                <EditableParagraph id="para-substitution-explanation" blockId="substitution-explanation">
                    Let us see substitution in action. We have the relationship{" "}
                    <InlineFormula latex="y = 2x" colorMap={{}} /> and we want to evaluate{" "}
                    <InlineFormula latex="y + 3" colorMap={{}} />. When{" "}
                    <InlineSpotColor varName="substitutionX" color="#62D0AD">x</InlineSpotColor>
                    {" "}equals{" "}
                    <InlineScrubbleNumber
                        varName="substitutionX"
                        {...numberPropsFromDefinition(getVariableInfo("substitutionX"))}
                    />, then{" "}
                    <InlineSpotColor varName="yValue" color="#AC8BF9">y</InlineSpotColor>
                    {" "}= 2 × {" "}
                    <InlineScrubbleNumber
                        varName="substitutionX"
                        {...numberPropsFromDefinition(getVariableInfo("substitutionX"))}
                    />{" "}= <ComputedY />.
                </EditableParagraph>
            </Block>
            <Block id="substitution-result-text" padding="sm">
                <EditableParagraph id="para-substitution-result-text" blockId="substitution-result-text">
                    Now we can substitute this into y + 3. We replace y with <ComputedY />, giving us{" "}
                    <ComputedY /> + 3 = <SubstitutionResult />. The visualization shows each step of this
                    process. Change x and watch all the values update!
                </EditableParagraph>
            </Block>
            <Block id="substitution-formula" padding="sm">
                <FormulaBlock
                    latex="y = 2 \times \scrub{substitutionX}"
                    variables={scrubVarsFromDefinitions(["substitutionX"])}
                />
            </Block>
        </div>
        <Block id="substitution-visualization" padding="sm" hasVisualization>
            <SubstitutionVisualization />
        </Block>
    </SplitLayout>,

    // When to use substitution
    <StackLayout key="layout-substitution-when-heading" maxWidth="xl">
        <Block id="substitution-when-heading" padding="md">
            <EditableParagraph id="para-substitution-when-heading" blockId="substitution-when-heading">
                <strong>When to Use Substitution</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-substitution-when" maxWidth="xl">
        <Block id="substitution-when" padding="sm">
            <EditableParagraph id="para-substitution-when" blockId="substitution-when">
                Substitution is especially useful when you have a{" "}
                <InlineTooltip
                    id="tooltip-system"
                    tooltip="Two or more equations that share the same variables and must all be true at the same time."
                >
                    system of equations
                </InlineTooltip>
                {" "}— two equations with two unknowns. For example: if we know that y = 2x and also that
                x + y = 9, we can substitute 2x for y in the second equation to get x + 2x = 9, which
                gives us 3x = 9, so x = 3. Then y = 2 × 3 = 6!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment
    <StackLayout key="layout-substitution-check-heading" maxWidth="xl">
        <Block id="substitution-check-heading" padding="md">
            <EditableParagraph id="para-substitution-check-heading" blockId="substitution-check-heading">
                <strong>Check Your Understanding</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-substitution-question" maxWidth="xl">
        <Block id="substitution-question" padding="md">
            <EditableParagraph id="para-substitution-question" blockId="substitution-question">
                If y = 3x and x = 2, what is y + 5? First find y by substituting x: y = 3 × 2 = 6.
                Then calculate y + 5 = 6 + 5. The answer is{" "}
                <InlineFeedback
                    varName="answerSubstitutionBasic"
                    correctValue="11"
                    position="terminal"
                    successMessage="— perfect! You correctly substituted the value of x to find y, then added 5"
                    failureMessage="— not quite"
                    hint="First calculate y = 3 × 2 = 6. Then add 5 to get y + 5"
                    reviewBlockId="substitution-explanation"
                    reviewLabel="Review the substitution steps"
                >
                    <InlineClozeInput
                        varName="answerSubstitutionBasic"
                        correctAnswer="11"
                        {...clozePropsFromDefinition(getVariableInfo("answerSubstitutionBasic"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition
    <StackLayout key="layout-substitution-transition" maxWidth="xl">
        <Block id="substitution-transition" padding="lg">
            <EditableParagraph id="para-substitution-transition" blockId="substitution-transition">
                Now you understand the basic idea of substitution. But algebra really shines when we tackle
                more complex problems with multiple steps. In the next section, we will work through some
                challenging examples where you need to substitute, simplify, and solve. This is where all
                your skills come together!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
