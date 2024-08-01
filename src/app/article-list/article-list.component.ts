import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
// Permet d'utiliser les ngfor et ngif etc
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
 selector: 'app-article-list',
 standalone: true,
 imports: [CommonModule, RouterLink, ReactiveFormsModule],
 templateUrl: './article-list.component.html',
 styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
articleForm: FormGroup;
 articles: any[] = [];

 constructor(
  private articleService: ArticleService,
  private fb: FormBuilder
  ) { 
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

// OnSubmit for add and update
onSubmit() {
  const article = this.articleForm.value;
  if (article.id) {
    this.articleService.updatePost(article.id, article).subscribe(() => {
      const index = this.articles.findIndex((p) => p.id === article.id);
      this.articles[index] = article;  // For demonstration, update locally
      Swal.fire('Succès', 'Article modifié avec succès', 'success');
    });
  } else {
    this.articleService.createPost(article).subscribe(() => {
      this.articles.unshift(article);  // For demonstration, prepend locally
    });
  }
  this.articleForm.reset();
}

editArticle(article:any){
  this.articleForm.patchValue(article)
}

 ngOnInit() {
   this.chargerArticles();
 }

 // Charger les articles
 chargerArticles() {
   this.articleService.getPosts().subscribe((article) => {
     this.articles = article;
   });
 }


 // Ajouter un article
//  ajouterArticle() {
//    const nouvelArticle = { title: 'New Post', body: 'This is a new post.', userId: 1 };
//    this.articleService.createPost(nouvelArticle).subscribe(() => {
//      this.articles.unshift(nouvelArticle);  // For demonstration, prepend locally
//    });
//  }


 // Modifier un article
//  modifierArticle(article: any) {
//    const articleModifie = { ...article, title: 'Updated Title' };
//    this.articleService.updatePost(article.id, articleModifie).subscribe(() => {
//      const index = this.articles.findIndex((p) => p.id === article.id);
//      this.articles[index] = articleModifie;  // For demonstration, update locally
//    });
//  }

// Supprimer un article
 supprimerArticle(id: number) {
  this.articleService.deletePost(id).subscribe(() => {
    this.articles = this.articles.filter((article) => article.id !== id);
    Swal.fire('Succès', 'Article supprimé avec succès', 'success')
  });
}

}
