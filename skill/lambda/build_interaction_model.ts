#!/usr/bin/env ts-node

import {
  ControlInteractionModelGenerator,
  AmazonIntent,
  AmazonBuiltInSlotType,
} from 'ask-sdk-controls';

new ControlInteractionModelGenerator()
  .withInvocationName('mr math')
  .addIntent({
    name: AmazonIntent.FallbackIntent,
  })
  .addIntent({
    name: AmazonIntent.HelpIntent,
  })
  .addIntent({
    name: AmazonIntent.CancelIntent,
  })
  .addIntent({
    name: AmazonIntent.StopIntent,
  })
  .addIntent({
    name: AmazonIntent.NavigateHomeIntent,
  })
  .addIntent({
    name: 'AddIntent',
    samples: ['add {num1} and {num2}'],
    slots: [
      {
        name: 'num1',
        type: AmazonBuiltInSlotType.NUMBER,
      },
      {
        name: 'num2',
        type: AmazonBuiltInSlotType.NUMBER,
      },
    ],
  })
  .addIntent({
    name: 'SubtractIntent',
    samples: ['subtract {num1} from {num2}'],
    slots: [
      {
        name: 'num1',
        type: AmazonBuiltInSlotType.NUMBER,
      },
      {
        name: 'num2',
        type: AmazonBuiltInSlotType.NUMBER,
      },
    ],
  })
  .addIntent({
    name: 'MultiplyIntent',
    samples: ['multiply {num1} and {num2}'],
    slots: [
      {
        name: 'num1',
        type: AmazonBuiltInSlotType.NUMBER,
      },
      {
        name: 'num2',
        type: AmazonBuiltInSlotType.NUMBER,
      },
    ],
  })
  .addIntent({
    name: 'DivideIntent',
    samples: ['divide {num1} by {num2}'],
    slots: [
      {
        name: 'num1',
        type: AmazonBuiltInSlotType.NUMBER,
      },
      {
        name: 'num2',
        type: AmazonBuiltInSlotType.NUMBER,
      },
    ],
  })
  .addIntent({
    name: 'HelloWorldIntent',
    samples: [
      'hello',
      'how are you',
      'say hi world',
      'say hi',
      'hi',
      'say hello world',
      'say hello',
    ],
  })
  .buildAndWrite('../skill-package/interactionModels/custom/en-US.json');
