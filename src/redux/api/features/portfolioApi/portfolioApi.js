const { baseApi } = require("../../baseApi");

const PortfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFolderApi: builder.mutation({
      query: (data) => ({
        url: "/folders",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddFolderApiMutation } = PortfolioApi;
