import React, { useState } from "react";

const questions = [
  {
    q: "What is this system used for?",
    a: "This system helps detect possible vitamin deficiencies based on uploaded images of the tongue, eyes, skin, or nails using AI."
  },
  {
    q: "How does the AI work?",
    a: "The AI model analyzes patterns and color characteristics in the uploaded image to predict potential deficiencies based on trained data."
  },
  {
    q: "What images should I upload?",
    a: "Clear, well-lit images of your tongue, nails, eyes, or skin work best. Avoid blurry or shadowed photos."
  },
  {
    q: "Is my data safe?",
    a: "Yes. All predictions and user data are stored securely and only visible to you."
  },
  {
    q: "Can I see my past reports?",
    a: "Yes, you can view your full prediction history under the 'History' tab, including downloadable reports."
  },
  {
    q: "What vitamins can be detected?",
    a: "Currently, the system supports prediction of Vitamin A, B12, D, and Zinc deficiencies."
  },
  {
    q: "Is this a medical diagnosis?",
    a: "No. This tool is for informational purposes only. Always consult a medical professional for diagnosis and treatment."
  },
  {
    q: "Can I edit my profile?",
    a: "Yes. Navigate to the 'Profile' page to edit your personal details."
  },
  {
    q: "Do I need an account to use the app?",
    a: "Yes. Signing up lets you save your history, generate reports, and receive personalized suggestions."
  },
  {
    q: "Is this app free to use?",
    a: "Yes. This is a free tool created for educational and health awareness purposes."
  },
  {
    q: "Can I use my mobile camera?",
    a: "Yes! You can use mobile or desktop devices to upload or capture photos."
  },
  {
    q: "What happens after uploading?",
    a: "The image is processed, AI prediction is made, and you are shown the result followed by recommendations."
  },
  {
    q: "What is the confidence score?",
    a: "It shows how confident the AI is in its prediction (e.g. 89%). Higher means more likely correct."
  },
  {
    q: "How long does processing take?",
    a: "Usually under 5 seconds depending on your image quality and internet speed."
  },
  {
    q: "Can I download my result?",
    a: "Yes. After prediction and recommendation, you can download a full PDF report."
  },
  {
    q: "What is Gemini AI?",
    a: "It's Google's advanced language model that generates intelligent, personalized health recommendations."
  },
  {
    q: "Can I reset my password?",
    a: "Yes. On the login screen, click 'Forgot Password?' to begin the reset process."
  },
  {
    q: "Is internet required?",
    a: "Yes. The system relies on cloud AI services and database storage which need internet access."
  },
  {
    q: "Who can use this system?",
    a: "Anyone! It's designed for general health awareness and educational use."
  },
  {
    q: "How accurate is the system?",
    a: "It depends on image quality and condition. It gives strong indicators but should not replace real diagnostics."
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = (idx) => {
    setOpen(open === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {questions.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-300 bg-white rounded-lg shadow-sm p-4"
          >
            <button
              onClick={() => toggle(idx)}
              className="text-left w-full text-blue-700 font-medium text-lg"
            >
              {item.q}
            </button>
            {open === idx && (
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
