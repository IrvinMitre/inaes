import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blog-aside-options',
  templateUrl: './blog-aside-options.component.html',
  styleUrls: ['./blog-aside-options.component.scss']
})
export class BlogAsideOptionsComponent implements OnInit {

	baseUrl: string = environment.ipUrl 

  url = '../../../assets/background-upload-image.jpg';
  tagsInput = [];
  header = " "
  limit = 3;
  placeholder = "Ingresa etiquetas";
  mode = "success";

  constructor() { }


  ngOnInit(): void {

  }

  displayTags(tag) {
    this.tagsInput = tag;
  }
  onSelectFile(event) {
    /*
    if (event.target.files && event.target.files[0]) {
      
      const formData = new FormData();

      formData.append('files', event.target.files[0]);
      formData.append('directory', 'posts');
      formData.append('subDirectory', 'empresa-geolocalizacion');
      console.log(formData.get('files'));

      this.dirServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
          this.url = `${this.baseUrl}/${imarl}`;

          this.sub = 'geolocalizacion_empresa';
        },
        (err) => {
          console.log(err);
        }
      );
        }*/
  }

    

}
