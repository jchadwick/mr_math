import * as Alexa from 'ask-sdk-core';
import {
  InputUtil,
  ControlHandler,
  ControlManager,
  Control,
  ContainerControl,
  LiteralContentAct,
  ControlInput,
  ControlResultBuilder,
} from 'ask-sdk-controls';
import { IntentRequest } from 'ask-sdk-model';

abstract class IntentControl extends Control {
  constructor(protected intent: string) {
    super(new.target.name);
  }

  canHandle(input: ControlInput): boolean | Promise<boolean> {
    return InputUtil.isIntent(input, this.intent);
  }

  takeInitiative(
    _: ControlInput,
    __: ControlResultBuilder
  ): void | Promise<void> {}
  canTakeInitiative() {
    return false;
  }
}

abstract class LiteralContentControl extends Control {
  constructor(public literalContent: any, public endSession: boolean) {
    super(new.target.name);
    this.literalContent = literalContent;
    this.endSession = endSession;
  }
  handle(_: ControlInput, resultBuilder: ControlResultBuilder) {
    if (this.literalContent)
      resultBuilder.addAct(
        new LiteralContentAct(this, { promptFragment: this.literalContent })
      );
    if (this.endSession) resultBuilder.endSession();
  }
  takeInitiative(
    _: ControlInput,
    __: ControlResultBuilder
  ): void | Promise<void> {}
  canTakeInitiative() {
    return false;
  }
}

class LaunchRequestControl extends LiteralContentControl {
  canHandle(input: ControlInput) {
    return InputUtil.isLaunchRequest(input);
  }
}

class StopOrCancelIntentControl extends LiteralContentControl {
  canHandle(input: ControlInput) {
    return (
      InputUtil.isIntent(input, 'AMAZON.StopIntent') ||
      InputUtil.isIntent(input, 'AMAZON.CancelIntent')
    );
  }
}

class SessionEndedRequestControl extends LiteralContentControl {
  canHandle(input: ControlInput) {
    return InputUtil.isSessionEndedRequest(input);
  }
}

class AnswerIntentControl extends IntentControl {
  constructor() {
    super('AnswerIntent');
  }

  async handle(input: ControlInput, resultBuilder: ControlResultBuilder) {
    const answer = +Alexa.getSlotValue(
      input.handlerInput.requestEnvelope,
      'answer'
    );

    const correctAnswer = 2;
    const isCorrectAnswer = answer === correctAnswer;

    const response = isCorrectAnswer ? 'Correct!' : 'Incorrect, try again.';

    resultBuilder.addAct(
      new LiteralContentAct(this, {
        promptFragment: `You answered ${answer}, which is ${response} What's 1+1?`,
      })
    );
  }
}

class FallbackResponseControl extends LiteralContentControl {
  canHandle(input: ControlInput) {
    return InputUtil.isFallbackIntent(input);
  }
}

class MrMathGameControl extends ContainerControl {
  constructor(props: any) {
    super(props);
    this.addChild(
      new LaunchRequestControl(
        "Welcome to Mr Math.  Let's get started! What's 1+1?",
        false
      )
    )
      .addChild(new AnswerIntentControl())
      .addChild(
        new StopOrCancelIntentControl(
          "I guess you don't want to talk anymore",
          true
        )
      )
      .addChild(new SessionEndedRequestControl('have a good day', false))
      .addChild(
        new FallbackResponseControl(
          "I'm sorry, I don't understand that.",
          false
        )
      );
  }
}

class HelloManager extends ControlManager {
  createControlTree() {
    return new MrMathGameControl({ id: 'HelloControl' });
  }
}

const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(new ControlHandler(new HelloManager()))
  .lambda();

export { handler, HelloManager };
