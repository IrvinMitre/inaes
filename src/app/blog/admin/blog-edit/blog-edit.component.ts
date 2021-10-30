import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';



@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '40vh',
    minHeight: '10vh',
    placeholder: 'Ingresa el contenido de tu publicación aquí.',
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Montserrat-Regular',
    fonts: [
      {class: 'Montserrat-Regular', name: 'Montserrat'},
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    toolbarHiddenButtons: [
      [
        'customClasses',
        'insertImage',
        'insertVideo',
      ]
    ],
  };

  constructor() { }

  ngOnInit(): void {
  }
  
}
