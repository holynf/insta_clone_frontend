import fetchAuthorizedData from "@/utils/fetchAuthorizedData";

export function getFetchUserInformation(token: string) {
    if (!token) return null;
    return fetchAuthorizedData(`/user/profile`, token);
}

export function putFetchLikePost(token: string, body: { postId: string }) {
    if (!token) return null;
    return fetchAuthorizedData(`/posts/like`, token, { body, method: "PUT" });
}

export function putFetchUnLikePost(token: string, body: { postId: string }) {
    if (!token) return null;
    return fetchAuthorizedData(`/posts/unlike`, token, { body, method: "PUT" });
}

export function putFetchPostComment(token: string, body: { postId: string; text: string }) {
    if (!token) return null;
    return fetchAuthorizedData(`/posts/comment`, token, { body, method: "PUT" });
}

export function postCreatePost(token: string, body: FormData) {
    if (!token) return null;
    return fetchAuthorizedData(`posts/create`, token, {
        body: body,
        method: "POST",
    });
}
