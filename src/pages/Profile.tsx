import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { postService, type Post } from '../services/postService';
import '../assets/css/Profile.css';
import logo from '../assets/images/3.png';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const username = authService.getUsername();

    const [posts, setPosts] = useState<Post[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);

    const [titleFilter, setTitleFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async (page: number, title: string, tags: string) => {
        setLoading(true);
        setError(null);
        try {
        
            const response = await postService.getPosts({ page, title, tags });

            if (response && Array.isArray(response.posts)) {
                setPosts(response.posts);
            } else {
                console.error("API response.posts is not an array:", response);
                setPosts([]); 
            }
    
            setHasNextPage(response.current_page < response.total_page);
    
        } catch (err: any) {
            setError(err.message || 'Could not fetch posts.');
            if (err.message.includes('token')) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    }, []); 

    useEffect(() => {
        fetchPosts(currentPage, titleFilter, tagFilter);
    }, [currentPage, titleFilter, tagFilter, fetchPosts]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tags = await postService.getTags();
                setAllTags(tags);
            } catch (err) {
                console.error("Failed to fetch tags:", err);
            }
        };
        fetchTags();
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    const handleSearch = () => {
        setCurrentPage(1); 
        fetchPosts(1, titleFilter, tagFilter);
    };

    const handleAddNew = async () => {
        const title = prompt("Enter new title:");
        if (!title) return;
        const description = prompt("Enter new description:");
        if (!description) return;
        const tagsInput = prompt(`Enter tags, separated by commas (e.g., Html,Css,Js):`);
        if (tagsInput === null) return;

        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
        try {
            await postService.createPost({ title, description, tags });
            fetchPosts(1, '', '');
            setTitleFilter('');
            setTagFilter('');
        } catch (err: any) {
            alert(`Error creating post: ${err.message}`);
        }
    };

    const handleEdit = async (post: Post) => {
        const newTitle = prompt("Enter new title:", post.title);
        if (!newTitle) return;
        const newDescription = prompt("Enter new description:", post.description);
        if (!newDescription) return;
        const newTagsInput = prompt("Enter new tags:", post.tags.join(', '));
        if (newTagsInput === null) return;

        const newTags = newTagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
        try {
            await postService.updatePost(post.id, { title: newTitle, description: newDescription, tags: newTags });
            fetchPosts(currentPage, titleFilter, tagFilter); 
        } catch (err: any) {
            alert(`Error updating post: ${err.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await postService.deletePost(id);
                fetchPosts(currentPage, titleFilter, tagFilter); 
            } catch (err: any) {
                alert(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div className="profile-container">
            <aside className="profile-sidebar">
                <div className="profile-sidebar-header">
                    <img src={logo} alt="Logo" className="profile-logo" />
                    <div className="profile-user"><span>Welcome, {username}</span></div>
                </div>
                <nav className="profile-sidebar-nav">
                    <a href="#posts" className="profile-nav-link profile-active">Posts</a>
                    <button onClick={handleLogout} className="profile-nav-link">Logout</button>
                </nav>
            </aside>

            <main className="profile-main-content">
                <div className="profile-content-controls">
                    <button onClick={handleAddNew} className="profile-add-new-btn">Add new</button>
                    <div className="profile-filters">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            className="profile-filter-input"
                            value={titleFilter}
                            onChange={(e) => setTitleFilter(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <select
                            className="profile-filter-input"
                            value={tagFilter}
                            onChange={(e) => setTagFilter(e.target.value)}
                        >
                            <option value="">All Tags</option>
                            {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                        </select>
                        <button onClick={handleSearch} className="profile-search-btn">Search</button>
                    </div>
                </div>

                <div className="profile-table-wrapper">
                    <table className="profile-posts-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Tags</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <tr><td colSpan={5}>Loading...</td></tr>}
                            {error && <tr><td colSpan={5} className="profile-error-message">{error}</td></tr>}
                            {!loading && !error && posts.length === 0 && <tr><td colSpan={5}>No posts found.</td></tr>}
                            {!loading && !error && posts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.id.substring(0, 8)}...</td>
                                    <td>{post.title}</td>
                                    <td>{post.description}</td>
                                    <td>{post.tags.join(', ')}</td>
                                    <td>
                                        <div className="profile-action-icons">
                                            <button onClick={() => handleEdit(post)} className="profile-action-btn">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                            </button>
                                            <button onClick={() => handleDelete(post.id)} className="profile-action-btn">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="profile-pagination">
                    <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage <= 1}>Previous</button>
                    <span>Page {currentPage}</span>
                    <button onClick={() => setCurrentPage(p => p + 1)} disabled={!hasNextPage}>Next</button>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;

