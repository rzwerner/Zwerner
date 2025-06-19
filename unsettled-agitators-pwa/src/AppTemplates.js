// src/AppTemplates.js

export const templates = {
  '': {
    name: 'Select a Template',
    inputs: [],
  },
  'problem-solution-action': {
    name: 'Problem-Solution-Action',
    inputs: [
      { id: 'problem', label: 'Core Problem', type: 'textarea' },
      { id: 'solution', label: 'Core Solution', type: 'textarea' },
      { id: 'desiredAction', label: 'Desired Action', type: 'textarea' },
    ],
    promptGenerator: (inputs) => `
You are a content creator for "Unsettled Agitators"...
Core Problem: ${inputs.problem}
Core Solution: ${inputs.solution}
Desired Action: ${inputs.desiredAction}
...
    `,
  },
  'myth-vs-reality': {
    name: 'Myth vs. Reality',
    inputs: [
      { id: 'myth', label: 'Common Myth', type: 'textarea' },
      { id: 'reality', label: 'Biblical Reality', type: 'textarea' },
      { id: 'coreEvidence', label: 'Core Biblical Evidence/Reason', type: 'textarea' },
    ],
    promptGenerator: (inputs) => `
Myth: ${inputs.myth}
Reality: ${inputs.reality}
Evidence: ${inputs.coreEvidence}
...
    `,
  },
  'behind-the-scenes': {
    name: 'Behind-the-Scenes/Day in the Life',
    inputs: [
      { id: 'coreActivity', label: 'Core Activity/Process', type: 'textarea' },
      { id: 'keyInsight', label: 'Key Insight/Lesson Learned', type: 'textarea' },
    ],
    promptGenerator: (inputs) => `
Activity: ${inputs.coreActivity}
Insight: ${inputs.keyInsight}
...
    `,
  },
  'curated-list': {
    name: 'Curated List/Top X',
    inputs: [
      { id: 'listTopic', label: 'List Topic', type: 'textarea' },
      { id: 'items', label: 'List Items (one per line)', type: 'textarea' },
    ],
    promptGenerator: (inputs) => `
Topic: ${inputs.listTopic}
Items:
${inputs.items}

Structure:
Hook: [Start with the topic in a strong hook]
List: [Enumerate each item with energy and biblical conviction]
Conclusion/CTA: [Tie back to Kingdom-first purpose]
Hashtags: #UnsettledAgitators #KingdomGear #TopX
    `,
  },
};
