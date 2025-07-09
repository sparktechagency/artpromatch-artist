const { baseApi } = require("../../baseApi");

const AvailablityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setTimeOffApi: builder.mutation({
      query: (data) => ({
        url: "artists/time-off",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useSetTimeOffApiMutation } = AvailablityApi;
