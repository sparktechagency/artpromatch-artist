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
    fetchFOlders: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["folders"],
    }),
  }),
});

export const { useAddFolderApiMutation, useFetchFOldersQuery } = PortfolioApi;
