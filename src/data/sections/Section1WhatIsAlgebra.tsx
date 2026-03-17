/**
 * Section 1: What is Algebra?
 * ===========================
 *
 * Introduces the concept that variables are just "mystery numbers" waiting to be discovered.
 * Features an interactive Mystery Box visualization.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineFeedback,
    InlineTooltip,
    InlineSpotColor,
} from "@/components/atoms";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ─────────────────────────────────────────
// Mystery Box Visualization Component
// ─────────────────────────────────────────
function MysteryBoxVisualization() {
    const mysteryValue = useVar("mysteryBoxValue", 5) as number;
    const revealProgress = useVar("revealProgress", 0) as number;

    // Calculate opacity based on reveal progress
    const numberOpacity = revealProgress / 100;
    const lidOffset = (revealProgress / 100) * 40; // Lid opens as you reveal

    return (
        <div className="relative">
            <svg
                viewBox="0 0 300 280"
                width="100%"
                height="280"
                className="mx-auto"
                style={{ maxWidth: 300 }}
            >
                {/* Background glow when revealed */}
                {revealProgress > 50 && (
                    <ellipse
                        cx="150"
                        cy="160"
                        rx={80 + revealProgress * 0.3}
                        ry={60 + revealProgress * 0.2}
                        fill={`rgba(98, 208, 173, ${(revealProgress - 50) / 200})`}
                    />
                )}

                {/* Box body */}
                <rect
                    x="75"
                    y="120"
                    width="150"
                    height="120"
                    rx="8"
                    fill="#8E90F5"
                    stroke="#6366f1"
                    strokeWidth="3"
                />

                {/* Box front face highlight */}
                <rect
                    x="85"
                    y="130"
                    width="130"
                    height="100"
                    rx="4"
                    fill="rgba(255, 255, 255, 0.1)"
                />

                {/* Question mark (fades as you reveal) */}
                <text
                    x="150"
                    y="195"
                    textAnchor="middle"
                    fontSize="64"
                    fontWeight="bold"
                    fill="white"
                    opacity={1 - numberOpacity}
                >
                    ?
                </text>

                {/* The hidden number (appears as you reveal) */}
                <text
                    x="150"
                    y="195"
                    textAnchor="middle"
                    fontSize="56"
                    fontWeight="bold"
                    fill="#62D0AD"
                    opacity={numberOpacity}
                >
                    {mysteryValue}
                </text>

                {/* Box lid (moves up as you reveal) */}
                <g transform={`translate(0, ${-lidOffset})`}>
                    {/* Lid back */}
                    <polygon
                        points="65,120 150,80 235,120"
                        fill="#AC8BF9"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                    />
                    {/* Lid front */}
                    <rect
                        x="65"
                        y="100"
                        width="170"
                        height="25"
                        rx="4"
                        fill="#AC8BF9"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                    />
                    {/* Lid highlight */}
                    <rect
                        x="75"
                        y="105"
                        width="150"
                        height="10"
                        rx="2"
                        fill="rgba(255, 255, 255, 0.2)"
                    />
                </g>

                {/* The letter x label */}
                <text
                    x="150"
                    y="265"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fill="#62D0AD"
                >
                    x
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="mystery-box-reveal"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag to peek inside the box",
                        position: { x: "50%", y: "85%" },
                    },
                ]}
            />
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive result display
// ─────────────────────────────────────────
function MysteryBoxResult() {
    const mysteryValue = useVar("mysteryBoxValue", 5) as number;
    const result = mysteryValue + 3;
    return <span className="font-semibold text-[#AC8BF9]">{result}</span>;
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const section1Blocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-algebra-intro-title" maxWidth="xl">
        <Block id="algebra-intro-title" padding="lg">
            <EditableH1 id="h1-algebra-intro-title" blockId="algebra-intro-title">
                What is Algebra?
            </EditableH1>
        </Block>
    </StackLayout>,

    // Introduction paragraph
    <StackLayout key="layout-algebra-intro-hook" maxWidth="xl">
        <Block id="algebra-intro-hook" padding="sm">
            <EditableParagraph id="para-algebra-intro-hook" blockId="algebra-intro-hook">
                Imagine you have a mystery box, and someone tells you: "The number inside this box, plus 3, equals 8."
                Could you figure out what number is hiding inside? Of course you could! The mystery number must be 5,
                because 5 + 3 = 8. Congratulations, you just did algebra without even knowing it.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // What is algebra explanation
    <StackLayout key="layout-algebra-intro-definition" maxWidth="xl">
        <Block id="algebra-intro-definition" padding="sm">
            <EditableParagraph id="para-algebra-intro-definition" blockId="algebra-intro-definition">
                <InlineTooltip
                    id="tooltip-algebra-definition"
                    tooltip="A branch of mathematics where letters and symbols are used to represent numbers and quantities in formulas and equations."
                >
                    Algebra
                </InlineTooltip>
                {" "}is simply the mathematics of finding unknown numbers. Instead of writing "mystery box" every time,
                mathematicians use letters like{" "}
                <InlineSpotColor varName="mysteryBoxValue" color="#62D0AD">x</InlineSpotColor>,{" "}
                <InlineSpotColor varName="yValue" color="#AC8BF9">y</InlineSpotColor>, or any other letter to represent
                these unknown values. These letters are called{" "}
                <InlineTooltip
                    id="tooltip-variable-definition"
                    tooltip="A symbol (usually a letter) that represents an unknown number or a quantity that can change."
                >
                    variables
                </InlineTooltip>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Section heading for Mystery Box
    <StackLayout key="layout-algebra-mystery-heading" maxWidth="xl">
        <Block id="algebra-mystery-heading" padding="md">
            <EditableH2 id="h2-algebra-mystery-heading" blockId="algebra-mystery-heading">
                The Mystery Box
            </EditableH2>
        </Block>
    </StackLayout>,

    // Mystery Box interactive visualization with explanation
    <SplitLayout key="layout-algebra-mystery-box" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="algebra-mystery-explanation" padding="sm">
                <EditableParagraph id="para-algebra-mystery-explanation" blockId="algebra-mystery-explanation">
                    Here is your mystery box, labeled with the letter{" "}
                    <InlineSpotColor varName="mysteryBoxValue" color="#62D0AD">x</InlineSpotColor>.
                    Right now, it is hiding the number{" "}
                    <InlineScrubbleNumber
                        varName="mysteryBoxValue"
                        {...numberPropsFromDefinition(getVariableInfo("mysteryBoxValue"))}
                    />. But do not worry, the variable{" "}
                    <InlineSpotColor varName="mysteryBoxValue" color="#62D0AD">x</InlineSpotColor>{" "}
                    is not scary at all. It is just a placeholder for a number we might not know yet.
                </EditableParagraph>
            </Block>
            <Block id="algebra-mystery-reveal-control" padding="sm">
                <EditableParagraph id="para-algebra-mystery-reveal" blockId="algebra-mystery-reveal-control">
                    Peek inside the box by dragging the reveal slider:{" "}
                    <InlineScrubbleNumber
                        varName="revealProgress"
                        {...numberPropsFromDefinition(getVariableInfo("revealProgress"))}
                        formatValue={(v) => `${v}%`}
                    />. Watch how the question mark transforms into the actual number. This is exactly what happens
                    when we "solve for x" in algebra. We reveal the mystery!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="algebra-mystery-visualization" padding="sm" hasVisualization>
            <MysteryBoxVisualization />
        </Block>
    </SplitLayout>,

    // Key insight
    <StackLayout key="layout-algebra-key-insight" maxWidth="xl">
        <Block id="algebra-key-insight" padding="md">
            <EditableParagraph id="para-algebra-key-insight" blockId="algebra-key-insight">
                Here is the key insight: if{" "}
                <InlineSpotColor varName="mysteryBoxValue" color="#62D0AD">x</InlineSpotColor>{" "}
                equals{" "}
                <InlineScrubbleNumber
                    varName="mysteryBoxValue"
                    {...numberPropsFromDefinition(getVariableInfo("mysteryBoxValue"))}
                />, then{" "}
                <InlineSpotColor varName="mysteryBoxValue" color="#62D0AD">x</InlineSpotColor>{" "}
                + 3 equals <MysteryBoxResult />. Try changing the value above and watch how the result updates automatically.
                This is the power of algebra. Once we know what the variable equals, we can calculate anything with it.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Why use letters heading
    <StackLayout key="layout-algebra-why-letters-heading" maxWidth="xl">
        <Block id="algebra-why-letters-heading" padding="md">
            <EditableH2 id="h2-algebra-why-letters-heading" blockId="algebra-why-letters-heading">
                Why Use Letters Instead of Numbers?
            </EditableH2>
        </Block>
    </StackLayout>,

    // Why use letters explanation
    <StackLayout key="layout-algebra-why-letters" maxWidth="xl">
        <Block id="algebra-why-letters" padding="sm">
            <EditableParagraph id="para-algebra-why-letters" blockId="algebra-why-letters">
                You might wonder why we bother with letters at all. Here is the brilliant part: letters let us write
                rules that work for any number. For example, "double a number and add 5" works whether the original
                number is 3, 7, or 1000. In algebra, we write this rule as 2x + 5, where x can be any number you choose.
                This single expression captures an infinite number of calculations!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Check understanding heading
    <StackLayout key="layout-algebra-check-heading" maxWidth="xl">
        <Block id="algebra-check-heading" padding="md">
            <EditableH2 id="h2-algebra-check-heading" blockId="algebra-check-heading">
                Check Your Understanding
            </EditableH2>
        </Block>
    </StackLayout>,

    // Assessment question
    <StackLayout key="layout-algebra-question-variable" maxWidth="xl">
        <Block id="algebra-question-variable" padding="md">
            <EditableParagraph id="para-algebra-question-variable" blockId="algebra-question-variable">
                A variable like x is just a letter that represents an unknown{" "}
                <InlineFeedback
                    varName="answerWhatIsVariable"
                    correctValue="number"
                    position="terminal"
                    successMessage="— exactly right! A variable is simply a placeholder for a number we might not know yet"
                    failureMessage="— not quite"
                    hint="Think about what is hiding inside the mystery box"
                >
                    <InlineClozeInput
                        varName="answerWhatIsVariable"
                        correctAnswer="number"
                        {...clozePropsFromDefinition(getVariableInfo("answerWhatIsVariable"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition to next section
    <StackLayout key="layout-algebra-transition" maxWidth="xl">
        <Block id="algebra-transition" padding="lg">
            <EditableParagraph id="para-algebra-transition" blockId="algebra-transition">
                Now that you understand what variables are, let us learn how to write and read algebraic expressions.
                These are the building blocks that let us describe mathematical relationships using letters and numbers together.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
