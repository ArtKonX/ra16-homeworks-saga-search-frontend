import createRequest from "./createRequest";

const apiRequests = (action: ApiRequests) => {
    const { payload, url, type } = action;

    if (payload && payload.search) {
        switch (type) {
            case 'searchSkillsRequest':
                return createRequest({
                    method: "GET",
                    url: `${url}/api/search?q=${payload.search}`
                });
            default:
                throw new Error(`Unrecognized action type: ${type}`);
        }
    }
};

export default apiRequests;