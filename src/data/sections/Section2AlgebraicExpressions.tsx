/**
 * Section 2: Writing and Reading Algebraic Expressions
 * =====================================================
 *
 * Teaches how to translate everyday situations into algebra,
 * and how to read expressions like "2x + 3".
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
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    scrubVarsFromDefinitions,
} from "../variables";
import { useVar } from "@/stores";

// ─────────────────────────────────────────
// Expression Machine Visualization
// ─────────────────────────────────────────
function ExpressionMachineVisualization() {
    const coefficient = useVar("coefficientValue", 2) as number;
    const constant = useVar("constantValue", 3) as number;
    const inputValue = useVar("inputValueForExpression", 4) as number;

    const step1 = inputValue;
    const step2 = coefficient * inputValue;
    const step3 = step2 + constant;

    return (
        <div className="relative">
            <svg
                viewBox="0 0 400 320"
                width="100%"
                height="320"
                className="mx-auto"
                style={{ maxWidth: 400 }}
            >
                {/* Input circle */}
                <circle cx="60" cy="80" r="35" fill="#62D0AD" />
                <text
                    x="60"
                    y="88"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fill="white"
                >
                    {step1}
                </text>
                <text
                    x="60"
                    y="135"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#64748b"
                >
                    Input (x)
                </text>

                {/* Arrow 1 */}
                <path
                    d="M 100 80 L 145 80"
                    stroke="#94a3b8"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                />

                {/* Multiply operation box */}
                <rect
                    x="150"
                    y="50"
                    width="80"
                    height="60"
                    rx="8"
                    fill="#8E90F5"
                />
                <text
                    x="190"
                    y="88"
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="bold"
                    fill="white"
                >
                    × {coefficient}
                </text>
                <text
                    x="190"
                    y="135"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#64748b"
                >
                    Multiply
                </text>

                {/* Arrow 2 */}
                <path
                    d="M 235 80 L 265 80"
                    stroke="#94a3b8"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                />

                {/* Intermediate result */}
                <circle cx="300" cy="80" r="30" fill="#F7B23B" opacity="0.8" />
                <text
                    x="300"
                    y="88"
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill="white"
                >
                    {step2}
                </text>

                {/* Arrow 3 (down) */}
                <path
                    d="M 300 115 L 300 165"
                    stroke="#94a3b8"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                />

                {/* Add operation box */}
                <rect
                    x="260"
                    y="170"
                    width="80"
                    height="60"
                    rx="8"
                    fill="#F8A0CD"
                />
                <text
                    x="300"
                    y="208"
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="bold"
                    fill="white"
                >
                    + {constant}
                </text>
                <text
                    x="300"
                    y="255"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#64748b"
                >
                    Add
                </text>

                {/* Arrow 4 (down) */}
                <path
                    d="M 300 235 L 300 265"
                    stroke="#94a3b8"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                />

                {/* Output circle */}
                <circle cx="300" cy="290" r="25" fill="#22c55e" />
                <text
                    x="300"
                    y="298"
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="bold"
                    fill="white"
                >
                    {step3}
                </text>

                {/* Arrow marker definition */}
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                    </marker>
                </defs>

                {/* Expression label at bottom */}
                <text
                    x="200"
                    y="310"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="600"
                    fill="#64748b"
                >
                    {coefficient}x + {constant} = {step3}
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="expression-machine-input"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the input value to see the result change",
                        position: { x: "15%", y: "28%" },
                    },
                ]}
            />
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive computed value displays
// ─────────────────────────────────────────
function ComputedExpressionResult() {
    const coefficient = useVar("coefficientValue", 2) as number;
    const constant = useVar("constantValue", 3) as number;
    const inputValue = useVar("inputValueForExpression", 4) as number;
    const result = coefficient * inputValue + constant;
    return <span className="font-semibold text-[#22c55e]">{result}</span>;
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const section2Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-expressions-title" maxWidth="xl">
        <Block id="expressions-title" padding="lg">
            <EditableH2 id="h2-expressions-title" blockId="expressions-title">
                Writing and Reading Algebraic Expressions
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-expressions-intro" maxWidth="xl">
        <Block id="expressions-intro" padding="sm">
            <EditableParagraph id="para-expressions-intro" blockId="expressions-intro">
                An{" "}
                <InlineTooltip
                    id="tooltip-expression"
                    tooltip="A combination of numbers, variables, and operations (like +, −, ×, ÷) that represents a value."
                >
                    algebraic expression
                </InlineTooltip>
                {" "}is like a recipe for calculating a number. It tells us exactly what operations to perform.
                For example, the expression "2x + 3" means "multiply x by 2, then add 3." Let us break this down
                piece by piece.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Parts of an expression
    <StackLayout key="layout-expressions-parts-heading" maxWidth="xl">
        <Block id="expressions-parts-heading" padding="md">
            <EditableParagraph id="para-expressions-parts-heading" blockId="expressions-parts-heading">
                <strong>The Parts of an Expression</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Coefficient explanation
    <StackLayout key="layout-expressions-coefficient" maxWidth="xl">
        <Block id="expressions-coefficient" padding="sm">
            <EditableParagraph id="para-expressions-coefficient" blockId="expressions-coefficient">
                In the expression{" "}
                <InlineFormula
                    latex="\clr{coef}{2}\clr{var}{x} + \clr{const}{3}"
                    colorMap={{ coef: "#8E90F5", var: "#62D0AD", const: "#F8A0CD" }}
                />
                , the number{" "}
                <InlineSpotColor varName="coefficientValue" color="#8E90F5">2</InlineSpotColor>
                {" "}is called the{" "}
                <InlineTooltip
                    id="tooltip-coefficient"
                    tooltip="A number that multiplies a variable. In 2x, the coefficient is 2."
                >
                    coefficient
                </InlineTooltip>
                . It tells us how many times to multiply the variable. The{" "}
                <InlineSpotColor varName="constantValue" color="#F8A0CD">3</InlineSpotColor>
                {" "}is called the{" "}
                <InlineTooltip
                    id="tooltip-constant"
                    tooltip="A fixed number that doesn't change, unlike a variable."
                >
                    constant
                </InlineTooltip>
                {" "}because it never changes, no matter what value x has.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive expression machine
    <SplitLayout key="layout-expressions-machine" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="expressions-machine-explanation" padding="sm">
                <EditableParagraph
                    id="para-expressions-machine-explanation"
                    blockId="expressions-machine-explanation"
                >
                    Watch how the expression machine works. When{" "}
                    <InlineSpotColor varName="inputValueForExpression" color="#62D0AD">x</InlineSpotColor>
                    {" "}equals{" "}
                    <InlineScrubbleNumber
                        varName="inputValueForExpression"
                        {...numberPropsFromDefinition(getVariableInfo("inputValueForExpression"))}
                    />, the machine first multiplies by{" "}
                    <InlineScrubbleNumber
                        varName="coefficientValue"
                        {...numberPropsFromDefinition(getVariableInfo("coefficientValue"))}
                    />, then adds{" "}
                    <InlineScrubbleNumber
                        varName="constantValue"
                        {...numberPropsFromDefinition(getVariableInfo("constantValue"))}
                    />. The final output is <ComputedExpressionResult />.
                </EditableParagraph>
            </Block>
            <Block id="expressions-formula-display" padding="sm">
                <FormulaBlock
                    latex="\clr{coef}{\scrub{coefficientValue}} \cdot \clr{var}{\scrub{inputValueForExpression}} + \clr{const}{\scrub{constantValue}}"
                    variables={scrubVarsFromDefinitions(["coefficientValue", "inputValueForExpression", "constantValue"])}
                    colorMap={{ coef: "#8E90F5", var: "#62D0AD", const: "#F8A0CD" }}
                />
            </Block>
        </div>
        <Block id="expressions-machine-viz" padding="sm" hasVisualization>
            <ExpressionMachineVisualization />
        </Block>
    </SplitLayout>,

    // Translating words to algebra
    <StackLayout key="layout-expressions-translation-heading" maxWidth="xl">
        <Block id="expressions-translation-heading" padding="md">
            <EditableParagraph
                id="para-expressions-translation-heading"
                blockId="expressions-translation-heading"
            >
                <strong>Translating Words into Algebra</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Translation examples
    <StackLayout key="layout-expressions-translation" maxWidth="xl">
        <Block id="expressions-translation" padding="sm">
            <EditableParagraph id="para-expressions-translation" blockId="expressions-translation">
                Algebra gives us a shorthand for describing calculations. Here are some common translations:
                "A number plus 5" becomes{" "}
                <InlineFormula latex="x + 5" colorMap={{}} />.
                "Triple a number" becomes{" "}
                <InlineFormula latex="3x" colorMap={{}} />.
                "Twice a number, minus 4" becomes{" "}
                <InlineFormula latex="2x - 4" colorMap={{}} />.
                Notice how the letter x always stands for "the unknown number" we are talking about.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Practice reading expressions
    <StackLayout key="layout-expressions-reading-heading" maxWidth="xl">
        <Block id="expressions-reading-heading" padding="md">
            <EditableParagraph id="para-expressions-reading-heading" blockId="expressions-reading-heading">
                <strong>Reading Expressions Out Loud</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-expressions-reading" maxWidth="xl">
        <Block id="expressions-reading" padding="sm">
            <EditableParagraph id="para-expressions-reading" blockId="expressions-reading">
                Being able to read algebra out loud helps you understand it better. The expression 5x + 2
                is read as "five x plus two" or "five times x, plus two." When you see 3x − 7, say
                "three x minus seven." This skill becomes essential when you start solving equations,
                because understanding the structure helps you know which operations to undo.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment heading
    <StackLayout key="layout-expressions-check-heading" maxWidth="xl">
        <Block id="expressions-check-heading" padding="md">
            <EditableParagraph id="para-expressions-check-heading" blockId="expressions-check-heading">
                <strong>Check Your Understanding</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment question
    <StackLayout key="layout-expressions-question" maxWidth="xl">
        <Block id="expressions-question" padding="md">
            <EditableParagraph id="para-expressions-question" blockId="expressions-question">
                If the expression is 2x + 3 and x equals 4, what is the result? First multiply 2 × 4 to get 8,
                then add 3. The answer is{" "}
                <InlineFeedback
                    varName="answerExpressionResult"
                    correctValue="11"
                    position="terminal"
                    successMessage="— perfect! You correctly evaluated the expression by following the order of operations"
                    failureMessage="— not quite"
                    hint="Remember: multiply first (2 × 4 = 8), then add the constant (8 + 3)"
                    reviewBlockId="expressions-machine-explanation"
                    reviewLabel="Try the expression machine again"
                >
                    <InlineClozeInput
                        varName="answerExpressionResult"
                        correctAnswer="11"
                        {...clozePropsFromDefinition(getVariableInfo("answerExpressionResult"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition
    <StackLayout key="layout-expressions-transition" maxWidth="xl">
        <Block id="expressions-transition" padding="lg">
            <EditableParagraph id="para-expressions-transition" blockId="expressions-transition">
                Now you know how to read and evaluate expressions. But what if we do not know the value of x?
                What if someone tells us "2x + 3 equals 11" and asks us to find x? That is where solving
                equations comes in, and it is like being a mathematical detective!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
