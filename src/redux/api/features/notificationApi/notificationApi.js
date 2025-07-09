const { baseApi } = require("../../baseApi");

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateNotification: builder.mutation({
      query: (data) => ({
        url: "/artists/notification-preferences",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateNotificationMutation } = notificationApi;
