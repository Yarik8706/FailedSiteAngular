import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appMain]'
})
export class MainDirective {

  @Input() set appShowPerson(age: number){
    if(age > 50){
      let view = this.viewContainer.createEmbeddedView(this.template);
      view.rootNodes[0].style.display = "block";
      view.rootNodes[0].style.borderStyle = "solid";
      view.rootNodes[0].style.borderColor = "black";
      view.rootNodes[0].style.borerWidth = 2;
    } else{
      this.viewContainer.clear();
    }

  }

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

}
