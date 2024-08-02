import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Pour les clients
import { Observable } from 'rxjs'; //Pour les observable

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8000/api/articles'; //Cette URL nous permet de récupérer les posts
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments'; //Cette URL nous permet de récupérer les Commentaires
  //Dans un service, on déclare les services qu'on utilise dans notre application. Ici, on déclare un service pour récupérer les posts.
  constructor(private http:HttpClient)  { 
  }
  // Observable, c'est une méthode async c'est à dire qu'il va attendre avant de retourner un résultat
  //Méthode pour récupérer tous les posts
  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPost(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  //Méthode créer un post 
  createPost(postData: { title: string; body: string}): Observable<any> {
    // Ici on utilise post pour ajouter
    return this.http.post(this.apiUrl, postData);
  }

  // Méthode pour mettre à jour un post en récupérant l'id du post typé et les données du post typées également
  updatePost(id: number, postData: { title: string; body: string; userId: number }): Observable<any> {
    // Ici on utilise put pour modifier le post
    return this.http.put(`${this.apiUrl}/${id}`, postData);
  }

  // Méthode pour supprimer un post en récupérant son id typé
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

    //Méthode pour récupérer tous les posts
    getComments(id:number): Observable<any> {
      return this.http.get(`${this.commentsUrl}?postId=${id}`);
    }
}
