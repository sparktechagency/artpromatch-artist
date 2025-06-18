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

    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verify-signup-otp",
        method: "POST",
        body: credentials,
      }),
    }),

    sendOtpAgain: builder.mutation({
      query: (credentials) => ({
        url: "/auth/resend-signup-otp",
        method: "POST",
        body: credentials,
      }),
    }),

    createArtist: builder.mutation({
      query: (credentials) => ({
        url: "/auth/create-profile",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useSendOtpAgainMutation,
  useCreateArtistMutation,
} = authApi;
