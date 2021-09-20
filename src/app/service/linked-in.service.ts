import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Comment } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class LinkedInService {

  private baseURL: string = 'https://localhost:44370/api/LinkedIn';

  constructor(private http: HttpClient) { }

  addLinkedInPost(savePost: Post) : Observable<number> {
    
    return this.http.post<number>(`${this.baseURL}/posts`, savePost);
  }

  listLinkedInPost(): Observable<Post[]> {
    
    return this.http.get<Post[]>(`${this.baseURL}/posts`);
  }

  likePost(LinkedInpostId: number): Observable<number> {
    return this.http.post<number>(`${this.baseURL}/posts/${LinkedInpostId}/like`, null);
  };

  deletePost(LinkedInpostId: number) : Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/posts/${LinkedInpostId}`);
  }

  addPostComment(LinkedInpostId, comment: Comment) : Observable<number> {
    
    return this.http.post<number>(`${this.baseURL}/posts/${LinkedInpostId}/comments`, comment);
  }

  listcomments(LinkedInpostId: number): Observable<Comment[]> {
    
    return this.http.get<Comment[]>(`${this.baseURL}/posts/${LinkedInpostId}/comments`);
  }

}
