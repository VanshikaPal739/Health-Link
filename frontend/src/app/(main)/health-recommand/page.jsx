'use client';
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Directly pass the Gemini API key
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY,
);

const Recommend = () => {
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      age: "",
      weight: "",
      gender: "",
      activityLevel: "",
      healthGoals: "",
    },
    validationSchema: Yup.object({
      age: Yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
      weight: Yup.number().required("Weight is required").positive("Weight must be positive"),
      gender: Yup.string().required("Gender is required"),
      activityLevel: Yup.string().required("Activity level is required"),
      healthGoals: Yup.string().required("Health goals are required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      let result;
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        result = await model.generateContent({
          history: [
            {
              role: "user",
              parts: [
                { text: "Analyze the health report and provide personalized health recommendations according to their age, weight and gender and the values are "+JSON.stringify(values) },
              ],
            },
          ],
         
        });

        const response = result.response.text();
        setRecommendation(response);
      } catch (error) {
        console.error("Something went wrong", error);
        setRecommendation("Failed to generate recommendations. Please try again.");
      } finally {
        setLoading(false);
        console.log(result);
      }
    },
  });


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-32">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Personalized Health Recommendations
      </h1>


      {/* Formik Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.age && formik.errors.age ? (
            <p className="text-red-500 text-sm">{formik.errors.age}</p>
          ) : null}
        </div>


        <div>
          <input
            type="number"
            name="weight"
            placeholder="Weight (in kg)"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.weight && formik.errors.weight ? (
            <p className="text-red-500 text-sm">{formik.errors.weight}</p>
          ) : null}
        </div>


        <div>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
          ) : null}
        </div>


        <div>
          <input
            type="text"
            name="activityLevel"
            placeholder="Activity Level (e.g., Sedentary, Moderate, Active)"
            value={formik.values.activityLevel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.activityLevel && formik.errors.activityLevel ? (
            <p className="text-red-500 text-sm">{formik.errors.activityLevel}</p>
          ) : null}
        </div>


        <div>
          <input
            type="text"
            name="healthGoals"
            placeholder="Health Goals (e.g., Weight Loss, Muscle Gain)"
            value={formik.values.healthGoals}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
          />
          {formik.touched.healthGoals && formik.errors.healthGoals ? (
            <p className="text-red-500 text-sm">{formik.errors.healthGoals}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Get Recommendations
        </button>
      </form>

     
      {/* Recommendations */}
      {loading ? (
        <p className="text-center text-blue-500 mt-32">Generating recommendations...</p>
      ) : (
        recommendation && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold text-gray-700">AI Recommendations:</h3>
            <p className="text-gray-600 mt-2">{recommendation}</p>
          </div>
        )
      )}
    </div>
  );
};
export default Recommend;