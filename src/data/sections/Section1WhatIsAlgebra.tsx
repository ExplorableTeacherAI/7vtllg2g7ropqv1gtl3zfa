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
// Magician's Hat Visualization Component
// ─────────────────────────────────────────
function MagicianHatVisualization() {
    const mysteryValue = useVar("mysteryBoxValue", 5) as number;
    const revealProgress = useVar("revealProgress", 0) as number;

    // Calculate positions based on reveal progress
    const pullHeight = (revealProgress / 100) * 120; // How high the number rises
    const numberOpacity = Math.min(1, revealProgress / 50); // Fade in quickly
    const sparkleOpacity = revealProgress > 20 ? Math.min(1, (revealProgress - 20) / 30) : 0;

    // Sparkle positions (appear as number rises)
    const sparkles = [
        { x: 100, y: 100, delay: 0, size: 8 },
        { x: 200, y: 90, delay: 0.2, size: 6 },
        { x: 130, y: 70, delay: 0.4, size: 10 },
        { x: 170, y: 60, delay: 0.1, size: 7 },
        { x: 90, y: 130, delay: 0.3, size: 5 },
        { x: 210, y: 120, delay: 0.5, size: 9 },
    ];

    return (
        <div className="relative">
            <svg
                viewBox="0 0 300 320"
                width="100%"
                height="320"
                className="mx-auto"
                style={{ maxWidth: 300 }}
            >
                {/* Magical glow behind the hat */}
                {revealProgress > 30 && (
                    <ellipse
                        cx="150"
                        cy="200"
                        rx={70 + revealProgress * 0.4}
                        ry={50 + revealProgress * 0.3}
                        fill={`rgba(172, 139, 249, ${(revealProgress - 30) / 200})`}
                    />
                )}

                {/* Sparkles */}
                {sparkles.map((sparkle, i) => (
                    <g
                        key={i}
                        opacity={sparkleOpacity * (0.5 + Math.sin(revealProgress / 10 + sparkle.delay * 10) * 0.5)}
                        transform={`translate(${sparkle.x}, ${sparkle.y - pullHeight * 0.3})`}
                    >
                        <polygon
                            points={`0,-${sparkle.size} ${sparkle.size * 0.3},-${sparkle.size * 0.3} ${sparkle.size},0 ${sparkle.size * 0.3},${sparkle.size * 0.3} 0,${sparkle.size} -${sparkle.size * 0.3},${sparkle.size * 0.3} -${sparkle.size},0 -${sparkle.size * 0.3},-${sparkle.size * 0.3}`}
                            fill="#F7B23B"
                        />
                    </g>
                ))}

                {/* The rising number (pulled from hat) */}
                <g transform={`translate(150, ${220 - pullHeight})`}>
                    {/* Number background circle */}
                    <circle
                        r={35}
                        fill="#62D0AD"
                        opacity={numberOpacity}
                    />
                    {/* The number itself */}
                    <text
                        y={12}
                        textAnchor="middle"
                        fontSize="42"
                        fontWeight="bold"
                        fill="white"
                        opacity={numberOpacity}
                    >
                        {mysteryValue}
                    </text>
                </g>

                {/* Hat brim (ellipse) */}
                <ellipse
                    cx="150"
                    cy="250"
                    rx="90"
                    ry="20"
                    fill="#1e293b"
                    stroke="#0f172a"
                    strokeWidth="3"
                />

                {/* Hat body (top part) */}
                <path
                    d="M 85 250 L 95 160 L 205 160 L 215 250 Z"
                    fill="#1e293b"
                    stroke="#0f172a"
                    strokeWidth="2"
                />

                {/* Hat band */}
                <rect
                    x="95"
                    y="220"
                    width="110"
                    height="20"
                    fill="#AC8BF9"
                />

                {/* Hat top (ellipse) */}
                <ellipse
                    cx="150"
                    cy="160"
                    rx="55"
                    ry="12"
                    fill="#334155"
                    stroke="#1e293b"
                    strokeWidth="2"
                />

                {/* Inner hat darkness (the opening) */}
                <ellipse
                    cx="150"
                    cy="160"
                    rx="45"
                    ry="8"
                    fill="#0f172a"
                />

                {/* Question mark inside hat (fades as number rises) */}
                <text
                    x="150"
                    y="200"
                    textAnchor="middle"
                    fontSize="36"
                    fontWeight="bold"
                    fill="#64748b"
                    opacity={Math.max(0, 1 - revealProgress / 40)}
                >
                    ?
                </text>

                {/* Magic wand */}
                <g transform={`rotate(${-15 + revealProgress * 0.1}, 240, 180)`}>
                    {/* Wand stick */}
                    <rect
                        x="220"
                        y="140"
                        width="8"
                        height="80"
                        rx="2"
                        fill="#1e293b"
                    />
                    {/* Wand tip */}
                    <rect
                        x="220"
                        y="130"
                        width="8"
                        height="15"
                        rx="2"
                        fill="white"
                    />
                    {/* Wand sparkle */}
                    {revealProgress > 10 && (
                        <circle
                            cx="224"
                            cy="128"
                            r={3 + Math.sin(revealProgress / 5) * 2}
                            fill="#F7B23B"
                            opacity={0.8}
                        />
                    )}
                </g>

                {/* The letter x label */}
                <text
                    x="150"
                    y="300"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fill="#62D0AD"
                >
                    x = ?
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="magic-hat-reveal"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag to pull the number from the hat",
                        position: { x: "50%", y: "90%" },
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

    // Section heading for Magician's Hat
    <StackLayout key="layout-algebra-mystery-heading" maxWidth="xl">
        <Block id="algebra-mystery-heading" padding="md">
            <EditableH2 id="h2-algebra-mystery-heading" blockId="algebra-mystery-heading">
                The Magician's Hat
            </EditableH2>
        </Block>
    </StackLayout>,

    // Magician's Hat interactive visualization with explanation
    <SplitLayout key="layout-algebra-mystery-box" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="algebra-mystery-explanation" padding="sm">
                <EditableParagraph id="para-algebra-mystery-explanation" blockId="algebra-mystery-explanation">
                    Imagine you are a magician with a magical top hat. Inside hides a mystery number, which
                    we call{" "}
                    <InlineSpotColor varName="mysteryBoxValue" color="#62D0AD">x</InlineSpotColor>.
                    Right now, the hat is hiding the number{" "}
                    <InlineScrubbleNumber
                        varName="mysteryBoxValue"
                        {...numberPropsFromDefinition(getVariableInfo("mysteryBoxValue"))}
                    />. The variable{" "}
                    <InlineSpotColor varName="mysteryBoxValue" color="#62D0AD">x</InlineSpotColor>{" "}
                    is not scary at all. It is just waiting to be revealed, like a rabbit from a hat!
                </EditableParagraph>
            </Block>
            <Block id="algebra-mystery-reveal-control" padding="sm">
                <EditableParagraph id="para-algebra-mystery-reveal" blockId="algebra-mystery-reveal-control">
                    Pull the number out of the hat by dragging the magic slider:{" "}
                    <InlineScrubbleNumber
                        varName="revealProgress"
                        {...numberPropsFromDefinition(getVariableInfo("revealProgress"))}
                        formatValue={(v) => `${v}%`}
                    />. Watch the sparkles appear as the number floats up! This is exactly what happens
                    when we "solve for x" in algebra. We perform the magic trick of revealing the mystery!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="algebra-mystery-visualization" padding="sm" hasVisualization>
            <MagicianHatVisualization />
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
