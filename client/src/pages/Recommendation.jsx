import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const recommendations = [
  {
    key: "Vitamin A Deficiency",
    title: "Vitamin A Deficiency",
    color: "bg-orange-50 border-orange-300",
    sections: {
      Symptoms: [
        "Night blindness or poor vision in dim light.",
        "Dry skin and hair, increased susceptibility to infections.",
        "Delayed growth in children.",
      ],
      Causes: [
        "Poor dietary intake of Vitamin A.",
        "Malabsorption disorders.",
        "Chronic infections.",
      ],
      Foods: [
        "Carrots, spinach, sweet potatoes, liver.",
        "Fortified dairy products and egg yolks.",
      ],
      Lifestyle: [
        "Limit alcohol consumption.",
        "Include green leafy vegetables daily.",
        "Regular health check-ups for children.",
      ],
      Cautions: [
        "Avoid Vitamin A overdose supplements.",
        "Consult healthcare before high-dose Vitamin A therapy.",
      ],
    },
  },
  {
    key: "Vitamin B12 Deficiency",
    title: "Vitamin B12 Deficiency",
    color: "bg-purple-50 border-purple-300",
    sections: {
      Symptoms: [
        "Fatigue and weakness.",
        "Tingling and numbness in hands and feet.",
        "Memory loss and mood changes.",
      ],
      Causes: [
        "Inadequate dietary intake (especially vegetarians).",
        "Poor absorption due to pernicious anemia or GI surgery.",
        "Certain medications.",
      ],
      Foods: [
        "Fish, poultry, eggs, milk.",
        "Fortified cereals and plant-based milk.",
      ],
      Lifestyle: [
        "Consider B12 supplements if vegetarian.",
        "Avoid long-term antacid use without consulting doctor.",
      ],
      Cautions: [
        "Do not self-medicate with B12 injections.",
        "Regular blood tests to monitor levels.",
      ],
    },
  },
  {
    key: "Vitamin D Deficiency",
    title: "Vitamin D Deficiency",
    color: "bg-yellow-50 border-yellow-300",
    sections: {
      Symptoms: [
        "Bone pain and muscle weakness.",
        "Increased risk of fractures.",
        "Fatigue and mood swings.",
      ],
      Causes: [
        "Lack of sunlight exposure.",
        "Poor dietary intake.",
        "Certain medical conditions affecting absorption.",
      ],
      Foods: [
        "Oily fish (salmon, tuna).",
        "Fortified milk and orange juice.",
        "Egg yolks.",
      ],
      Lifestyle: [
        "Spend 15-20 minutes daily in sunlight.",
        "Maintain healthy body weight.",
        "Regular physical activity.",
      ],
      Cautions: [
        "Avoid excessive sun exposure without protection.",
        "Consult doctor before supplements.",
      ],
    },
  },
  {
    key: "Zinc Deficiency",
    title: "Zinc Deficiency",
    color: "bg-blue-50 border-blue-300",
    sections: {
      Symptoms: [
        "Poor wound healing.",
        "Hair loss and skin lesions.",
        "Frequent infections.",
      ],
      Causes: [
        "Inadequate dietary intake.",
        "Malabsorption disorders.",
        "Excessive intake of iron or calcium interfering with zinc.",
      ],
      Foods: [
        "Shellfish, meat, beans, nuts.",
        "Whole grains and pumpkin seeds.",
      ],
      Lifestyle: [
        "Limit alcohol consumption.",
        "Avoid excess intake of iron supplements without medical advice.",
      ],
      Cautions: [
        "Do not exceed recommended zinc supplements dose.",
        "Monitor zinc levels if on long-term supplementation.",
      ],
    },
  },
];

const Section = ({ title, items }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <ul className="list-disc list-inside text-gray-700 space-y-1 leading-relaxed">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

const Recommendation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const rawDeficiency = state?.result || state?.deficiency || "";
  const normalizeMap = {
    "vitamin a": "Vitamin A Deficiency",
    "vitamin a deficiency": "Vitamin A Deficiency",
    "vitamin b12": "Vitamin B12 Deficiency",
    "vitamin b12 deficiency": "Vitamin B12 Deficiency",
    "vitamin d": "Vitamin D Deficiency",
    "vitamin d deficiency": "Vitamin D Deficiency",
    "zinc": "Zinc Deficiency",
    "zinc deficiency": "Zinc Deficiency",
  };
  const deficiency = normalizeMap[rawDeficiency.toLowerCase().trim()] || rawDeficiency;

  const selected = recommendations.find(
    (rec) => rec.key.toLowerCase().trim() === deficiency.toLowerCase().trim()
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-10 bg-white text-gray-900 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-12 text-center">
        Health Recommendations for {selected ? selected.title : "Your Deficiency"}
      </h1>

      {!selected ? (
        <div className="text-center text-red-600 text-lg">
          No recommendation available.{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 underline ml-1"
          >
            Go back to Home
          </button>
        </div>
      ) : (
        // <div
        //   className={`w-full rounded-3xl shadow-lg border-2 p-10 ${selected.color} max-h-[75vh] overflow-y-auto`}
        //   style={{ minHeight: "70vh" }}
        // >
        //   {/* Show all sections */}
        //   {Object.entries(selected.sections).map(([sectionTitle, items]) => (
        //     <Section key={sectionTitle} title={sectionTitle} items={items} />
        //   ))}
        // </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full rounded-3xl shadow-lg border-2 p-10 ${selected.color} max-h-[75vh] overflow-y-auto`}
          style={{ minHeight: "70vh" }}
        >
          {Object.entries(selected.sections).map(([sectionTitle, items]) => (
            <Section key={sectionTitle} title={sectionTitle} items={items} />
          ))}
        </motion.div>

      )}
    </div>
  );
};

export default Recommendation;





// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "../services/axios"; // Ensure axios is set up correctly with headers and base URL

// const Recommendation = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { result, confidence, image, age } = state || {}; // Use 'result' instead of 'deficiency'
//   const [advice, setAdvice] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!result) {
//       navigate("/"); // Redirect if no result is passed
//       return;
//     }

//     const fetchAdvice = async () => {
//       try {
//         // Construct payload correctly
//         const payload = { deficiency: result }; // Use result instead of deficiency
//         if (age) payload.age = age; // Include age if available

//         // Set token for Authorization (assuming you have a token stored in localStorage)
//         const token = localStorage.getItem("authToken"); // Replace 'authToken' with the actual key where the token is stored

//         // Send request to Gemini API
//         const res = await axios.post("/api/gemini/recommend", payload, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in Authorization header
//             "Content-Type": "application/json",
//           },
//         });

//         // Set response data or default message if no recommendation
//         setAdvice(res.data.recommendation || "No recommendation generated.");
//       } catch (err) {
//         console.error("Failed to fetch recommendations", err);
//         setAdvice("Could not fetch recommendations.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdvice();
//   }, [result, age, navigate]); // Depend on 'result' instead of 'deficiency'

//   return (
//     <div className="min-h-screen bg-white py-10 px-6 flex flex-col items-center">
//       <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
//         Personalized Recommendations
//       </h2>

//       <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl w-full shadow-md mb-6">
//         <p className="text-lg text-gray-800 mb-2">
//           <strong>Deficiency:</strong>{" "}
//           <span className="text-blue-700 font-semibold">{result}</span>
//         </p>
//         <p className="text-lg text-gray-800">
//           <strong>Confidence Score:</strong>{" "}
//           <span className="text-green-600 font-semibold">{confidence}</span>
//         </p>
//       </div>

//       {image && (
//         <div className="max-w-2xl w-full mb-6">
//           <img
//             src={image}
//             alt="Uploaded image"
//             className="rounded-xl border shadow object-cover max-h-[400px] w-full"
//           />
//         </div>
//       )}

//       <div className="max-w-2xl w-full bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
//         <h3 className="text-xl font-semibold mb-3 text-blue-700">
//           AI-Generated Suggestions:
//         </h3>
//         {loading ? (
//           <p className="text-blue-500 animate-pulse">Generating tips...</p>
//         ) : (
//           <div className="text-gray-800 whitespace-pre-line leading-relaxed">
//             {advice}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Recommendation;
