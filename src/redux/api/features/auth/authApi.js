const { baseApi } = require("../../baseApi");

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation } = authApi;
