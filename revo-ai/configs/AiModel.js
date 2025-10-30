// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: '- Write exactly Two detailed 30-second video script on the topic:How AI Revolutionized the World.\n- The script must contain only engaging narration or voiceover content—no visual descriptions.\n- Ensure a clear beginning, middle, and conclusion within the 30-second time frame.\n- Keep the script strictly focused on the given topic:. Avoid unrelated details.\n- Use a compelling, informative, and engaging tone that captivates the audience.\n- Do not include anything in parentheses, brackets, or visual descriptions.\n- Return the response in JSON format using the following schema:\n{\n  "scripts": [\n    {\n      "content": "First script here."\n    },\n    {\n      "content": "Second script here."\n    }\n  ]\n}',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'json\n{\n  "scripts": [\n    {\n      "content": "Imagine a world transformed. That\'s the power of AI. From self-driving cars navigating our streets to algorithms diagnosing diseases with unprecedented accuracy, artificial intelligence is reshaping every facet of modern life. Businesses are optimizing operations, scientists are accelerating research, and artists are creating groundbreaking masterpieces, all powered by intelligent machines. The AI revolution isn\'t a distant future; it\'s the present, continuously evolving and redefining what\'s possible. Embrace the change; the future is intelligent."\n    },\n    {\n      "content": "Remember endless commutes and tedious tasks? AI is changing that. It\'s not just about robots; it\'s about smarter solutions. AI is personalizing education, providing smarter healthcare, and even helping us combat climate change. Industries are becoming more efficient, creating new jobs and opportunities. Concerns exist, certainly, but responsible development of AI promises a future where technology amplifies human potential, creating a more prosperous and sustainable world for everyone. The AI revolution is here, reshaping our tomorrow."\n    }\n  ]\n}\n',
        },
      ],
    },
  ],
});

export const GenerateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: " Generate Image prompt of Cinematic style with all details for each scene for 30 seconds video: script: Rosa Parks refused to give up her seat on a bus in 1955. Her quiet act of defiance sparked the Montgomery Bus Boycott, a pivotal moment in the Civil Rights Movement. One person's bravery can inspire lasting change for everyone.\n\n- Just Give specifing image prompt depends on the story line\n- do not give camera angle image prompt\n- Follow the Following schema and return JSON data (Max 4-5 Images)\n- [\n{\nimagePrompt:\",\nsceneContent: \"Script Content>'\n\n}\n\n]\n\n\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'I am currently unable to generate images directly, as that capability is only enabled for early testers. However, I can provide you with image prompts based on your script.\n\njson\n[\n  {\n    "imagePrompt": "A 1950s-era bus interior, crowded with passengers. Rosa Parks, a Black woman with a calm but determined expression, sits in a seat near the front. A white male passenger stands nearby, looking expectantly at her. The atmosphere is tense and expectant.",\n    "sceneContent": "Rosa Parks refused to give up her seat on a bus in 1955."\n  },\n  {\n    "imagePrompt": "Rosa Parks being arrested by a police officer on the bus. Other passengers look on with expressions of shock and concern. The bus driver stands nearby, observing the situation.",\n    "sceneContent": "Her quiet act of defiance..."\n  },\n  {\n    "imagePrompt": "A large crowd of Black people walking down a street in Montgomery, Alabama, boycotting the buses. They carry signs and banners advocating for civil rights. The atmosphere is one of determination and solidarity.",\n    "sceneContent": "...sparked the Montgomery Bus Boycott, a pivotal moment in the Civil Rights Movement."\n  },\n  {\n    "imagePrompt": "A close-up shot of a newspaper headline announcing the end of segregation on Montgomery buses. Black and white people are shown riding the buses together, smiling and interacting peacefully.",\n    "sceneContent": "One person\'s bravery can inspire lasting change for everyone."\n  }\n]\n',
        },
      ],
    },
  ],
});
