import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = "📝 TO DO LIST 📝";

  
  supportedLanguages: any[] = [
    { value: 'en',
    icon: 'fi fi-gb',
    name: "English"},
    { value: 'fr',
    icon: 'fi fi-fr',
    name: "French"},
    { value: 'es',
    icon: 'fi fi-es',
    name: "Spanish"},
    { value: 'de',
    icon: 'fi fi-de',
    name: "German"},
    { value: 'it',
    icon: 'fi fi-it',
    name: "Italian"}];
  
    browserLang: any = { 
      value: '',
      icon: '',
      name: ''
    };
  
  constructor(private TranslateService: TranslateService){
    this.TranslateService.addLangs(this.supportedLanguages);
    this.TranslateService.setDefaultLang("en");

    let selectedBrowserLang = this.TranslateService.getBrowserLang();
    let indexLanguage = this.findIndexOfLanguagesByLanguage(selectedBrowserLang);
    let language = this.supportedLanguages[indexLanguage];
    
    this.browserLang.value = language.value;
    this.browserLang.icon = language.icon;
    this.browserLang.name = language.name;
    


    if(this.browserLang !=undefined){
      this.TranslateService.use(this.browserLang.value);
    }
      
  }

  selectLang(language: any): void  {
    this.TranslateService.use(language.value);
    this.browserLang.value = language.value;
    this.browserLang.icon = language.icon;
    this.browserLang.name = language.name;
  }

  findIndexOfLanguagesByLanguage(language: any): number {
    let index = -1;
     for(let i=0; i<this.supportedLanguages.length; i++)
      if(language == this.supportedLanguages[i].value){
        index = i;
        return index;
      }
    return index;
  }
}
