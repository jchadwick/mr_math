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
    name: 'AnswerIntent',
    samples: [
      '{answer}',
      "I think it's {answer}",
      'Maybe {answer}',
      'Definitely {answer}',
      "I'm sure it's {answer}",
      "I'm pretty sure it's {answer}",
      "I'm positive it's {answer}",
    ],
    slots: [
      {
        name: 'answer',
        type: AmazonBuiltInSlotType.NUMBER,
      },
    ],
  })
  .buildAndWrite('../skill-package/interactionModels/custom/en-US.json');
