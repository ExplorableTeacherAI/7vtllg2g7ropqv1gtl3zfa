/**
 * Section 3: Solving Simple Equations
 * ====================================
 *
 * The balancing act — what you do to one side, you must do to the other.
 * Features an interactive balance scale visualization.
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
// Balance Scale Visualization
// ─────────────────────────────────────────
function BalanceScaleVisualization() {
    const xValue = useVar("simpleEquationX", 5) as number;
    const subtractAmount = useVar("subtractAmount", 0) as number;

    // The equation is: x + 3 = 10
    // Left side: x + 3 - subtractAmount
    // Right side: 10 - subtractAmount
    const leftWeight = xValue + 3 - subtractAmount;
    const rightWeight = 10 - subtractAmount;

    // Calculate tilt based on weight difference (capped)
    const diff = leftWeight - rightWeight;
    const tiltAngle = Math.max(-15, Math.min(15, diff * 2));
    const isBalanced = Math.abs(diff) < 0.5;

    return (
        <div className="relative">
            <svg
                viewBox="0 0 400 300"
                width="100%"
                height="300"
                className="mx-auto"
                style={{ maxWidth: 400 }}
            >
                {/* Base/Stand */}
                <rect x="175" y="250" width="50" height="40" fill="#64748b" rx="4" />
                <rect x="190" y="120" width="20" height="130" fill="#64748b" />

                {/* Fulcrum triangle */}
                <polygon points="200,120 185,140 215,140" fill="#94a3b8" />

                {/* Balance beam (rotates) */}
                <g transform={`rotate(${tiltAngle}, 200, 120)`}>
                    {/* Beam */}
                    <rect x="50" y="115" width="300" height="10" rx="4" fill="#8E90F5" />

                    {/* Left pan strings */}
                    <line x1="80" y1="125" x2="60" y2="180" stroke="#64748b" strokeWidth="2" />
                    <line x1="120" y1="125" x2="140" y2="180" stroke="#64748b" strokeWidth="2" />

                    {/* Right pan strings */}
                    <line x1="280" y1="125" x2="260" y2="180" stroke="#64748b" strokeWidth="2" />
                    <line x1="320" y1="125" x2="340" y2="180" stroke="#64748b" strokeWidth="2" />

                    {/* Left pan */}
                    <ellipse cx="100" cy="185" rx="50" ry="12" fill="#62D0AD" />
                    <rect x="50" y="173" width="100" height="12" fill="#62D0AD" />

                    {/* Right pan */}
                    <ellipse cx="300" cy="185" rx="50" ry="12" fill="#F7B23B" />
                    <rect x="250" y="173" width="100" height="12" fill="#F7B23B" />

                    {/* Left side content */}
                    <g>
                        {/* x box */}
                        <rect x="65" y="140" width="35" height="30" rx="4" fill="#62D0AD" />
                        <text x="82" y="162" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">
                            x
                        </text>

                        {/* + 3 block (fades as we subtract) */}
                        {subtractAmount < 3 && (
                            <g opacity={1 - subtractAmount / 3}>
                                <rect x="105" y="140" width="35" height="30" rx="4" fill="#AC8BF9" />
                                <text x="122" y="162" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
                                    {Math.max(0, 3 - subtractAmount)}
                                </text>
                            </g>
                        )}
                    </g>

                    {/* Right side content */}
                    <g>
                        {/* 10 block (shows remaining after subtraction) */}
                        <rect x="270" y="140" width="60" height="30" rx="4" fill="#F7B23B" />
                        <text x="300" y="162" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">
                            {Math.max(0, 10 - subtractAmount)}
                        </text>
                    </g>
                </g>

                {/* Balance indicator */}
                <circle
                    cx="200"
                    cy="90"
                    r="20"
                    fill={isBalanced ? "#22c55e" : "#f59e0b"}
                    opacity="0.9"
                />
                <text
                    x="200"
                    y="96"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="white"
                >
                    {isBalanced ? "✓" : "?"}
                </text>

                {/* Labels */}
                <text x="100" y="220" textAnchor="middle" fontSize="14" fill="#64748b">
                    x + {Math.max(0, 3 - subtractAmount)}
                </text>
                <text x="300" y="220" textAnchor="middle" fontSize="14" fill="#64748b">
                    {Math.max(0, 10 - subtractAmount)}
                </text>

                {/* Equation at top */}
                <text x="200" y="40" textAnchor="middle" fontSize="18" fontWeight="600" fill="#1e293b">
                    {subtractAmount === 0
                        ? "x + 3 = 10"
                        : subtractAmount >= 3
                        ? `x = ${10 - subtractAmount}`
                        : `x + ${3 - subtractAmount} = ${10 - subtractAmount}`}
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="balance-scale-subtract"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag to subtract from both sides",
                        position: { x: "50%", y: "92%" },
                    },
                ]}
            />
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive displays
// ─────────────────────────────────────────
function RemainingConstant() {
    const subtract = useVar("subtractAmount", 0) as number;
    const remaining = Math.max(0, 3 - subtract);
    return <span className="font-semibold">{remaining}</span>;
}

function RemainingRightSide() {
    const subtract = useVar("subtractAmount", 0) as number;
    const remaining = Math.max(0, 10 - subtract);
    return <span className="font-semibold">{remaining}</span>;
}

function IsSolved() {
    const subtract = useVar("subtractAmount", 0) as number;
    return subtract >= 3 ? (
        <span className="text-[#22c55e] font-semibold">x = 7!</span>
    ) : (
        <span className="text-[#f59e0b]">Keep subtracting...</span>
    );
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const section3Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-equations-title" maxWidth="xl">
        <Block id="equations-title" padding="lg">
            <EditableH2 id="h2-equations-title" blockId="equations-title">
                Solving Simple Equations
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction to equations
    <StackLayout key="layout-equations-intro" maxWidth="xl">
        <Block id="equations-intro" padding="sm">
            <EditableParagraph id="para-equations-intro" blockId="equations-intro">
                An{" "}
                <InlineTooltip
                    id="tooltip-equation"
                    tooltip="A mathematical statement that two expressions are equal, connected by an equals sign (=)."
                >
                    equation
                </InlineTooltip>
                {" "}is a statement that two things are equal. When we write x + 3 = 10, we are saying
                "some mystery number plus 3 gives us 10." Solving an equation means finding the value
                of x that makes this statement true.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The balance principle
    <StackLayout key="layout-equations-balance-principle" maxWidth="xl">
        <Block id="equations-balance-principle" padding="sm">
            <EditableParagraph id="para-equations-balance-principle" blockId="equations-balance-principle">
                Think of an equation as a balanced scale. Both sides must weigh the same! The golden rule
                of equation solving is:{" "}
                <strong>whatever you do to one side, you must do to the other side</strong>.
                If you add 5 to the left, add 5 to the right. If you subtract 3 from the left, subtract 3
                from the right. This keeps the scale balanced.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Balance scale visualization
    <SplitLayout key="layout-equations-balance-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="equations-balance-explanation" padding="sm">
                <EditableParagraph
                    id="para-equations-balance-explanation"
                    blockId="equations-balance-explanation"
                >
                    The equation x + 3 = 10 is shown on the balance scale. To find x, we need to get x alone
                    on one side. We can do this by subtracting 3 from both sides. Drag the slider to subtract
                    from both sides:{" "}
                    <InlineScrubbleNumber
                        varName="subtractAmount"
                        {...numberPropsFromDefinition(getVariableInfo("subtractAmount"))}
                    />.
                </EditableParagraph>
            </Block>
            <Block id="equations-balance-status" padding="sm">
                <EditableParagraph id="para-equations-balance-status" blockId="equations-balance-status">
                    After subtracting, the left side shows x + <RemainingConstant /> and the right side
                    shows <RemainingRightSide />. When you subtract exactly 3 from both sides, you isolate
                    x and discover: <IsSolved />
                </EditableParagraph>
            </Block>
            <Block id="equations-formula" padding="sm">
                <FormulaBlock
                    latex="x + 3 - \scrub{subtractAmount} = 10 - \scrub{subtractAmount}"
                    variables={scrubVarsFromDefinitions(["subtractAmount"])}
                />
            </Block>
        </div>
        <Block id="equations-balance-scale" padding="sm" hasVisualization>
            <BalanceScaleVisualization />
        </Block>
    </SplitLayout>,

    // Step-by-step method
    <StackLayout key="layout-equations-method-heading" maxWidth="xl">
        <Block id="equations-method-heading" padding="md">
            <EditableParagraph id="para-equations-method-heading" blockId="equations-method-heading">
                <strong>The Step-by-Step Method</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-equations-method" maxWidth="xl">
        <Block id="equations-method" padding="sm">
            <EditableParagraph id="para-equations-method" blockId="equations-method">
                To solve x + 3 = 10, we use{" "}
                <InlineTooltip
                    id="tooltip-inverse"
                    tooltip="The opposite operation: addition undoes subtraction, multiplication undoes division."
                >
                    inverse operations
                </InlineTooltip>
                . Since 3 is being added to x, we subtract 3 from both sides to undo that addition.
                This gives us x + 3 − 3 = 10 − 3, which simplifies to x = 7. We can check our answer:
                7 + 3 = 10. It works!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // More examples
    <StackLayout key="layout-equations-examples-heading" maxWidth="xl">
        <Block id="equations-examples-heading" padding="md">
            <EditableParagraph id="para-equations-examples-heading" blockId="equations-examples-heading">
                <strong>The Same Idea Works for Different Operations</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-equations-examples" maxWidth="xl">
        <Block id="equations-examples" padding="sm">
            <EditableParagraph id="para-equations-examples" blockId="equations-examples">
                If the equation were x − 5 = 12, we would add 5 to both sides (the inverse of subtracting),
                giving us x = 17. If the equation were 3x = 15, we would divide both sides by 3 (the inverse
                of multiplying), giving us x = 5. The principle is always the same: undo what is being done
                to x by doing the opposite to both sides.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment
    <StackLayout key="layout-equations-check-heading" maxWidth="xl">
        <Block id="equations-check-heading" padding="md">
            <EditableParagraph id="para-equations-check-heading" blockId="equations-check-heading">
                <strong>Check Your Understanding</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-equations-question" maxWidth="xl">
        <Block id="equations-question" padding="md">
            <EditableParagraph id="para-equations-question" blockId="equations-question">
                Solve the equation x + 3 = 10. To isolate x, subtract 3 from both sides.
                The value of x is{" "}
                <InlineFeedback
                    varName="answerSimpleEquation"
                    correctValue="7"
                    position="terminal"
                    successMessage="— excellent! You correctly isolated x by subtracting 3 from both sides"
                    failureMessage="— not quite"
                    hint="Subtract 3 from both sides: x + 3 − 3 = 10 − 3"
                    reviewBlockId="equations-balance-explanation"
                    reviewLabel="Try the balance scale again"
                >
                    <InlineClozeInput
                        varName="answerSimpleEquation"
                        correctAnswer="7"
                        {...clozePropsFromDefinition(getVariableInfo("answerSimpleEquation"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition
    <StackLayout key="layout-equations-transition" maxWidth="xl">
        <Block id="equations-transition" padding="lg">
            <EditableParagraph id="para-equations-transition" blockId="equations-transition">
                You have mastered solving equations where x appears on just one side. But what happens when x
                appears on both sides of the equation? That is our next challenge, and it requires a clever
                trick: collecting all the x terms together first!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
