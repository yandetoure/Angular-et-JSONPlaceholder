import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';

export const routes: Routes = [
    { path: '', component: ArticleListComponent },
    { path: 'article/:id', component: ArticleDetailComponent }
];
