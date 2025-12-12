import { GoogleGenAI } from "@google/genai";
import { Post, PostStatus, PostType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateManifestoSummary = async (posts: Post[]): Promise<string> => {
  const approvedTextPosts = posts
    .filter(p => p.status === PostStatus.APPROVED && p.type === PostType.TEXT)
    .map(p => `- [${p.category}] ${p.content}`)
    .join('\n');

  if (!approvedTextPosts) {
    return "বিশ্লেষণ করার জন্য পর্যাপ্ত তথ্য নেই।";
  }

  const prompt = `
    নিচের তালিকাটি বাংলাদেশের সাধারণ জনগণের বিভিন্ন আকাঙ্ক্ষা ও দাবির তালিকা। 
    এই তথ্যগুলো বিশ্লেষণ করে একটি নির্বাচনী ইশতেহারের খসড়া তৈরি করুন। 
    মূল পয়েন্টগুলো বুলেট আকারে লিখুন এবং সেগুলোকে সুন্দর শিরোনামের অধীনে সাজান।
    ভাষা: বাংলা।

    জনগণের মতামত:
    ${approvedTextPosts}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a political analyst assisting in creating a manifesto for Bangladesh based on public input.",
      }
    });

    return response.text || "দুঃখিত, এই মুহূর্তে ইশতেহার তৈরি করা যাচ্ছে না।";
  } catch (error) {
    console.error("Error generating manifesto:", error);
    return "ইশতেহার জেনারেশনে ত্রুটি হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।";
  }
};