import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleForm: FormGroup;
  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) { 
    // Initialisation du formulaire avec les champs id, title et body
    this.articleForm = this.fb.group({
      id: [null],  // Champ id ajouté pour gérer la modification
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  // Méthode onSubmit pour ajouter ou mettre à jour un article
  onSubmit() {
    const article = this.articleForm.value;

    if (article.id) {
      // Si l'id est présent, on met à jour l'article existant
      this.articleService.updatePost(article.id, article).subscribe(() => {
        const index = this.articles.findIndex((p) => p.id === article.id);
        this.articles[index] = { ...this.articles[index], ...article };  // Mise à jour locale de l'article
        Swal.fire('Succès', 'Article modifié avec succès', 'success');
      });
    } else {
      // Si l'id n'est pas présent, on ajoute un nouvel article
      this.articleService.createPost(article).subscribe((newArticle) => {
        this.articles.unshift(newArticle);  // Ajout local de l'article en tête de liste
        Swal.fire('Succès', 'Article ajouté avec succès', 'success');
      });
    }

    this.articleForm.reset();  // Réinitialisation du formulaire après soumission
  }

  // Méthode pour préparer le formulaire à la modification d'un article
  editArticle(article: Article) {
    this.articleForm.patchValue({
      id: article.id,
      title: article.title,
      body: article.body
    });
  }

  // Méthode ngOnInit pour charger les articles au démarrage
  ngOnInit() {
    this.chargerArticles();
  }

  // Charger les articles depuis le service
  chargerArticles() {
    this.articleService.getPosts().subscribe((articles) => {
      this.articles = articles.reverse();  // Inversion pour avoir les plus récents en premier
    });
  }

  // Méthode pour supprimer un article
  supprimerArticle(id: number) {
    this.articleService.deletePost(id).subscribe(() => {
      this.articles = this.articles.filter((article) => article.id !== id);
      Swal.fire('Succès', 'Article supprimé avec succès', 'success');
    });
  }
}
