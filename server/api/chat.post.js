export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    // Read previous messages from the request body
    const previousMessages = await readBody(event);

	// console.log('Incoming request:', previousMessages);


    // Convert previous messages into the correct format for the chat API
    const messages = previousMessages.map((message) => ({
        role: message.role.toLowerCase(), // role can be 'system', 'user', or 'assistant'
        content: message.message
    }));

	// console.log('Previous messages:', previousMessages);


    // Add a system message or prompt if needed (optional)
    const systemMessage = {
        role: 'system',
        content: 'You are a helpful assistant.' // Customize as required
    };
    messages.unshift(systemMessage);
	console.log('Constructed messages:', messages);



    // Call the OpenAI Chat Completion API
    const req = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o', // Use the desired GPT-4 model (e.g., gpt-4-0613 or gpt-4-turbo)
            messages: messages,
            temperature: 0.9,
            max_tokens: 512,
            top_p: 1.0,
            frequency_penalty: 0,
            presence_penalty: 0.6
        })
    });

	// console.log('Responded messages:', req);

    // Parse the API response
    const res = await req.json();
	console.log('API Response:', res);


    // Extract and return the assistant's message
    return {
        message: res.choices[0].message.content
    };
});
