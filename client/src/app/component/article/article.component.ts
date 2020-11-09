import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/Article';
import { subscribeOn } from 'rxjs/operators';

class ImageSnippet {
    constructor(public src: string, public file: File) { }
}

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    names: string[];

    // Component properties
    allArticles: Article[];
    statusCode: number;
    requestProcessing = false;
    articleIdToUpdate = null;
    processValidation = false;
    validar = false;
    // Create form
    articleForm = new FormGroup({
        title: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        images: new FormControl('', Validators.required),
    });

    // Create constructor to get service instance
    constructor(private articleService: ArticleService, private router: Router) {
        this.names = ['article.images']
    }
    // Create ngOnInit() and and load articles
    ngOnInit(): void {
        this.getAllArticles();
    }
    //////////////////////////////////////////////

    selectedFile: ImageSnippet;

    processFile(imageInput: any) {
        const file: File = imageInput.files;
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
            this.articleService.uploadImage(this.selectedFile.file).subscribe(
                (res) => {

                },
                (err) => {

                })
        });

        reader.readAsDataURL(file);
    }

    //////////////////////////////////////////////


    // Fetch all articles
    getAllArticles() {

        const subs = this.articleService.getAllArticles()
            .subscribe((data: any) => {
                console.log('DATA::', data);
                this.allArticles = data,
                    errorCode => this.statusCode = errorCode
            });
    }

    // Handle create and update article
    onArticleFormSubmit() {
        this.processValidation = true;
        if (this.articleForm.invalid) {
            return; // Validation failed, exit from method.
        }
        // Form is valid, now perform create or update
        this.preProcessConfigurations();
        let article = this.articleForm.value;
        if (this.articleIdToUpdate === null) {
            // Generate article id then create article
            this.articleService.getAllArticles()
                .subscribe((articles: any) => {

                    //  let maxIndex = articles.length - 1;
                    //  let articleWithMaxIndex = articles[maxIndex];
                    //  let articleId = articleWithMaxIndex.id + 1;
                    //  article.id = articleId;
                    console.log(article);
                    // Create article
                    const subs = this.articleService.createArticle(article)
                        .subscribe((successCode: any) => {
                            this.statusCode = successCode;
                            this.getAllArticles();
                            this.backToCreateArticle();

                        },

                            errorCode => this.statusCode = errorCode
                        );


                });
        } else {
            // Handle update article
            article.id = this.articleIdToUpdate;
            const subs = this.articleService.updateArticle(article)
                .subscribe((successCode: any) => {
                    this.statusCode = successCode;
                    this.getAllArticles();
                    this.backToCreateArticle();
                },
                    errorCode => this.statusCode = errorCode);

        }

    }
    // Load article by id to edit
    loadArticleToEdit(articleId: string) {
        this.preProcessConfigurations();
        const subs = this.articleService.getArticleById(articleId)
            .subscribe((article: any) => {
                console.log(article, 'poiuytre');
                this.articleIdToUpdate = article.id;
                this.articleForm.setValue({ title: article.title, category: article.category, images: article.images });
                this.processValidation = true;
                this.requestProcessing = false;
            },
                errorCode => this.statusCode = errorCode);


    }
    // Delete article
    deleteArticle(articleId: string) {
        this.preProcessConfigurations();
        const subs = this.articleService.deleteArticleById(articleId)
            .subscribe(successCode => {
                // this.statusCode = successCode;
                // Expecting success code 204 from server
                this.statusCode = 204;
                this.getAllArticles();
                this.backToCreateArticle();
            },
                errorCode => this.statusCode = errorCode);

    }
    // Perform preliminary processing configurations
    preProcessConfigurations() {
        this.statusCode = null;
        this.requestProcessing = true;
    }
    // Go back from update to create
    backToCreateArticle() {
        this.articleIdToUpdate = null;
        this.articleForm.reset();
        this.processValidation = false;
    }

}
