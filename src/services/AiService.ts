interface ErrorType {
  NotFound: string;
  BadRequest: string;
  InternalServerError: string;
}

class AiService {
  private aiApiUrl;
  private errorType;

  constructor(apiURL: string, errorType: ErrorType) {
    this.aiApiUrl = apiURL;
    this.errorType = errorType;
  }

  public async getAiResponse(prompt: string): Promise<string> {
    if (!this.aiApiUrl) throw new Error(this.errorType.InternalServerError);
    const response = await fetch(this.aiApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseJson = await response.json();
    const answer = responseJson?.json;

    if (answer.error) throw new Error(this.errorType.InternalServerError);

    const answerText = answer?.choices?.[0]?.text;
    return answerText;
  }
}

export default AiService;
