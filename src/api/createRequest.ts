const createRequest = async (options: ApiCreateRequest): Promise<void> => {
  const reqSettings = {
    headers: { "Content-Type": "application/json" },
    method: options.method
  };

  try {
    const response = await fetch(options.url, reqSettings);

    return await response.json()

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default createRequest;
