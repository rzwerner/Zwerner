import React, { useState, useEffect } from 'react';

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateInputs, setTemplateInputs] = useState({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Additional States
  const [sermonTopic, setSermonTopic] = useState('');
  const [generatedSermonTitle, setGeneratedSermonTitle] = useState('');
  const [isLoadingSermonTitle, setIsLoadingSermonTitle] = useState(false);
  const [errorSermonTitle, setErrorSermonTitle] = useState('');

  const [lifeScenario, setLifeScenario] = useState('');
  const [generatedHebrewsApplication, setGeneratedHebrewsApplication] = useState('');
  const [isLoadingHebrewsApplication, setIsLoadingHebrewsApplication] = useState(false);
  const [errorHebrewsApplication, setErrorHebrewsApplication] = useState('');

  // Input Change Handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTemplateInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  // Clipboard Function
  const copyToClipboard = (content) => {
    if (content) {
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Content copied to clipboard!');
    }
  };

  // Generic API Call
  const callGeminiApi = async (prompt, setLoading, setError, setOutput) => {
    setLoading(true);
    setError('');
    setOutput('');

    try {
      const chatHistory = [{ role: 'user', parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = ''; // Add key if needed
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setOutput(text);
    } catch (err) {
      setError('Failed to generate content.');
    } finally {
      setLoading(false);
    }
  };

  // Return JSX
return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <h1 className="text-4xl font-bold text-red-600">Unsettled Agitators</h1>
    <p className="mt-4 text-lg text-gray-700">
      Select a content template to begin generating.
    </p>
  </div>
);

// Templates Object
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
