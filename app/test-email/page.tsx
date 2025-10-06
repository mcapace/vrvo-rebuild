'use client';

import { useState } from 'react';

export default function TestEmail() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const testEmail = async () => {
    setLoading(true);
    setResult('Testing email...');
    
    try {
      const response = await fetch('/api/test-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ SUCCESS: ${data.message}`);
      } else {
        setResult(`❌ ERROR: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setResult(`❌ NETWORK ERROR: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Test Email to hello@vrvo.co
        </h1>
        
        <button
          onClick={testEmail}
          disabled={loading}
          className="w-full bg-navy text-white py-3 px-6 rounded-lg hover:bg-navy-hover transition-colors font-medium disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Send Test Email'}
        </button>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Result:</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{result}</p>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600">
          <p><strong>What this does:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Sends a test email to hello@vrvo.co</li>
            <li>Uses the same Resend configuration as the contact form</li>
            <li>Shows if there are any configuration issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
