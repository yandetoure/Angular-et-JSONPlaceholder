import { Component } from '@angular/core';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';
import { RouterLink , Router, ActivatedRoute } from '@angular/router';
import { Comment } from '../comment.model';


@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent {

  constructor(
    private articleService: ArticleService, 
    private router:Router, 
    private route: ActivatedRoute) { }

    article :any;
    comments :Comment[] =[];

 ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.articleService.getPost(id).subscribe(article => {
        this.article = article;
        this.getComments(id);
      });
    });
  }

  getComments(id:number){
    this.articleService.getComments(this.article.id).subscribe(comments => {
      this.comments = comments;
    });
  }
}
