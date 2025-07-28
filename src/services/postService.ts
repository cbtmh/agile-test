import { authService } from './authService';

const API_URL = import.meta.env.VITE_POST_API_URL;

const getAuthHeaders = () => {
    const token = authService.getToken();

    if (!token || token === 'null' || token === 'undefined') {
        authService.logout();
        throw new Error('No authentication token found. User logged out.');
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export interface Post {
    id: string;
    title: string;
    description: string;
    tags: string[];
}

export interface GetPostsParams {
    page?: number;
    title?: string;
    tags?: string;
}

export interface PaginatedPostsResponse {
    posts: Post[];
    current_page: number;
    total_page: number;
    page_size: number;
    total: number;
}

export const postService = {

    async getPosts(params: GetPostsParams = { page: 1, title: '', tags: '' }): Promise<PaginatedPostsResponse> {
        const url = new URL(API_URL);
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.append(key, value.toString());
            }
        });

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch posts');
        }
        return response.json();
    },


    async getTags(): Promise<string[]> {
        const response = await fetch(`${API_URL}/tags`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tags');
        }
        return response.json();
    },


    async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return response.json();
    },


    async updatePost(id: string, postData: Partial<Omit<Post, 'id'>>): Promise<Post> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        return response.json();
    },

    async deletePost(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
    }
};
