/**
 * Section 7: Practice Challenge
 * =============================
 *
 * A set of progressively harder problems to consolidate learning.
 * Uses StepLayout for progressive disclosure.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { StepLayout, Step } from "@/components/layouts/StepLayout";
import {
    EditableH2,
    EditableParagraph,
    InlineClozeInput,
    InlineFeedback,
    InlineFormula,
} from "@/components/atoms";
import {
    getVariableInfo,
    clozePropsFromDefinition,
} from "../variables";

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const section7Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-practice-title" maxWidth="xl">
        <Block id="practice-title" padding="lg">
            <EditableH2 id="h2-practice-title" blockId="practice-title">
                Practice Challenge
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-practice-intro" maxWidth="xl">
        <Block id="practice-intro" padding="sm">
            <EditableParagraph id="para-practice-intro" blockId="practice-intro">
                Time to test your algebra skills! Work through these problems in order. Each one builds
                on what you have learned. Take your time, show your working on paper, and check your
                answers carefully. You must answer each question correctly to proceed to the next one.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // StepLayout with progressive questions
    <StackLayout key="layout-practice-steps" maxWidth="xl">
        <Block id="practice-steps" padding="md">
            <StepLayout varName="practiceStepProgress" showProgress={true}>
                {/* Question 1: Simple equation */}
                <Step completionVarName="answerPractice1" autoAdvance>
                    <Block id="practice-question-1" padding="md">
                        <EditableParagraph id="para-practice-question-1" blockId="practice-question-1">
                            <strong>Question 1:</strong> Solve for x in the equation{" "}
                            <InlineFormula latex="x + 7 = 13" colorMap={{}} />.
                            Remember to isolate x by doing the inverse operation. x ={" "}
                            <InlineFeedback
                                varName="answerPractice1"
                                correctValue="6"
                                position="terminal"
                                successMessage="— correct! Subtracting 7 from both sides gives x = 6"
                                failureMessage="— not quite"
                                hint="Subtract 7 from both sides: x + 7 − 7 = 13 − 7"
                            >
                                <InlineClozeInput
                                    varName="answerPractice1"
                                    correctAnswer="6"
                                    {...clozePropsFromDefinition(getVariableInfo("answerPractice1"))}
                                />
                            </InlineFeedback>.
                        </EditableParagraph>
                    </Block>
                </Step>

                {/* Question 2: Equation with coefficient */}
                <Step completionVarName="answerPractice2" autoAdvance>
                    <Block id="practice-question-2" padding="md">
                        <EditableParagraph id="para-practice-question-2" blockId="practice-question-2">
                            <strong>Question 2:</strong> Solve for x in the equation{" "}
                            <InlineFormula latex="4x = 12" colorMap={{}} />.
                            When a number multiplies x, we divide to find x. x ={" "}
                            <InlineFeedback
                                varName="answerPractice2"
                                correctValue="3"
                                position="terminal"
                                successMessage="— excellent! Dividing both sides by 4 gives x = 3"
                                failureMessage="— not quite"
                                hint="Divide both sides by 4: 4x ÷ 4 = 12 ÷ 4"
                            >
                                <InlineClozeInput
                                    varName="answerPractice2"
                                    correctAnswer="3"
                                    {...clozePropsFromDefinition(getVariableInfo("answerPractice2"))}
                                />
                            </InlineFeedback>.
                        </EditableParagraph>
                    </Block>
                </Step>

                {/* Question 3: Two-step equation */}
                <Step completionVarName="answerPractice3" autoAdvance>
                    <Block id="practice-question-3" padding="md">
                        <EditableParagraph id="para-practice-question-3" blockId="practice-question-3">
                            <strong>Question 3:</strong> Solve for x in the equation{" "}
                            <InlineFormula latex="2x + 5 = 19" colorMap={{}} />.
                            This requires two steps: first subtract 5, then divide by 2. x ={" "}
                            <InlineFeedback
                                varName="answerPractice3"
                                correctValue="7"
                                position="terminal"
                                successMessage="— brilliant! After subtracting 5 we get 2x = 14, then dividing by 2 gives x = 7"
                                failureMessage="— not quite"
                                hint="First: 2x + 5 − 5 = 19 − 5, so 2x = 14. Then divide both sides by 2"
                            >
                                <InlineClozeInput
                                    varName="answerPractice3"
                                    correctAnswer="7"
                                    {...clozePropsFromDefinition(getVariableInfo("answerPractice3"))}
                                />
                            </InlineFeedback>.
                        </EditableParagraph>
                    </Block>
                </Step>

                {/* Question 4: Complex substitution */}
                <Step completionVarName="answerPracticeComplex" autoAdvance>
                    <Block id="practice-question-complex" padding="md">
                        <EditableParagraph id="para-practice-question-complex" blockId="practice-question-complex">
                            <strong>Question 4 (Challenge):</strong> Solve the system of equations:{" "}
                            <InlineFormula latex="y = 3x" colorMap={{}} /> and{" "}
                            <InlineFormula latex="x + y = 8" colorMap={{}} />.
                            Substitute the first equation into the second: x + 3x = 8, so 4x = 8. x ={" "}
                            <InlineFeedback
                                varName="answerPracticeComplex"
                                correctValue="2"
                                position="terminal"
                                successMessage="— outstanding! When x = 2, y = 3 × 2 = 6, and indeed 2 + 6 = 8"
                                failureMessage="— not quite"
                                hint="After substitution: x + 3x = 4x = 8. Divide both sides by 4"
                            >
                                <InlineClozeInput
                                    varName="answerPracticeComplex"
                                    correctAnswer="2"
                                    {...clozePropsFromDefinition(getVariableInfo("answerPracticeComplex"))}
                                />
                            </InlineFeedback>.
                        </EditableParagraph>
                    </Block>
                </Step>

                {/* Completion step */}
                <Step>
                    <Block id="practice-complete" padding="lg">
                        <EditableParagraph id="para-practice-complete" blockId="practice-complete">
                            <strong>Congratulations!</strong> You have completed all the practice problems.
                            You have demonstrated your ability to solve simple equations, two-step equations,
                            and systems of equations using substitution. These are fundamental skills that
                            will serve you well as you continue your algebra journey!
                        </EditableParagraph>
                    </Block>
                </Step>
            </StepLayout>
        </Block>
    </StackLayout>,

    // Summary
    <StackLayout key="layout-practice-summary-heading" maxWidth="xl">
        <Block id="practice-summary-heading" padding="lg">
            <EditableParagraph id="para-practice-summary-heading" blockId="practice-summary-heading">
                <strong>What You Have Learned</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-summary" maxWidth="xl">
        <Block id="practice-summary" padding="sm">
            <EditableParagraph id="para-practice-summary" blockId="practice-summary">
                In this lesson, you discovered that algebra is not as mysterious as it first appears.
                You learned that variables are simply placeholders for unknown numbers, like our mystery
                box. You learned to read and write algebraic expressions, understanding that 2x + 3
                means "double a number and add 3." You mastered solving equations by keeping the balance,
                always doing the same thing to both sides. And finally, you learned substitution, the
                powerful technique of replacing one expression with an equivalent one to solve complex problems.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-next-steps" maxWidth="xl">
        <Block id="practice-next-steps" padding="lg">
            <EditableParagraph id="para-practice-next-steps" blockId="practice-next-steps">
                <strong>Next Steps:</strong> Practice makes perfect! Try creating your own equations
                and solving them. Challenge yourself with harder problems. Remember, every expert was
                once a beginner. The more you practice these techniques, the more natural they will
                become. Good luck on your mathematical journey!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
