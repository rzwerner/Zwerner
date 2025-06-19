import React, { useState } from 'react';
import './style.css';
import { templates } from './AppTemplates'; // Assume you moved templates to a separate file

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateInputs, setTemplateInputs] = useState({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTemplateInputs((prevInputs) => ({ ...prevInputs, [id]: value }));
  };

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      alert('Copied to clipboard!');
    }
  };

  const generateContent = async () => {
    if (!selectedTemplate || !templates[selectedTemplate]) return;

    const { promptGenerator } = templates[selectedTemplate];
    const prompt = promptGenerator(templateInputs);
    setIsLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      const apiKey = 'AIzaSyADmYvVENg4gc111BGhsACxAaVK1dyRu0k'; // add your API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setGeneratedContent(text);
    } catch (err) {
      setError('Failed to generate content.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Unsettled Agitators</h1>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Select Template</span>
          <select
            value={selectedTemplate}
            onChange={(e) => {
              setSelectedTemplate(e.target.value);
              setTemplateInputs({});
              setGeneratedContent('');
            }}
            className="mt-1 block w-full p-2 border rounded"
          >
            {Object.entries(templates).map(([key, tpl]) => (
              <option key={key} value={key}>{tpl.name}</option>
            ))}
          </select>
        </label>

        {templates[selectedTemplate]?.inputs?.map((input) => (
          <div key={input.id} className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium" htmlFor={input.id}>{input.label}</label>
            <textarea
              id={input.id}
              value={templateInputs[input.id] || ''}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <button
          onClick={generateContent}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          disabled={isLoading || !selectedTemplate}
        >
          {isLoading ? 'Generating...' : 'Generate Content'}
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {generatedContent && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Generated Content</h2>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 border rounded text-sm">
              {generatedContent}
            </pre>
            <button
              onClick={copyToClipboard}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
