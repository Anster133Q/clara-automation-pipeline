require("dotenv").config();
const axios = require("axios");

async function extractFromTranscript(transcript) {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `
Extract structured JSON ONLY.
Do NOT hallucinate.
If data missing, leave blank or add to questions_or_unknowns.

Fields:
account_id
company_name
business_hours (days, start, end, timezone)
office_address
services_supported
emergency_definition
emergency_routing_rules
non_emergency_routing_rules
call_transfer_rules
integration_constraints
after_hours_flow_summary
office_hours_flow_summary
questions_or_unknowns
notes

Transcript:
${transcript}
              `
            }
          ]
        }
      ]
    }
  );

  return response.data;
}

module.exports = { extractFromTranscript };