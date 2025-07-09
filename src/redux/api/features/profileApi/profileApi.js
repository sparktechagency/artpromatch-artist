const { baseApi } = require("../../baseApi");

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePersonalInfo: builder.mutation({
      query: (data) => ({
        url: "artists/profile",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});
export const { useUpdatePersonalInfoMutation } = profileApi;
