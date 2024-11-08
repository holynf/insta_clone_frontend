import fetchAuthorizedData from "@/utils/fetchAuthorizedData";

export function fetchUserInformation(token: string) {
    if (!token) return null;
    return fetchAuthorizedData(`/user/profile`, token);
}
