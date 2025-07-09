const { baseApi } = require("../../baseApi");

const PortfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFolderApi: builder.mutation({
      query: (data) => ({
        url: "/api/v1/folders",
        method: "POST",
        body: "data",
      }),
    }),
  }),
});

export const { useAddFolderApiMutation } = PortfolioApi;
