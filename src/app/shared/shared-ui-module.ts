import { NgModule } from '@angular/core';
import { AlphabetSelectorComponent } from '../alphabet_selector/alphabet.selector.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        NgSelectModule,
        FormsModule
    ],
    declarations: [
        AlphabetSelectorComponent
    ],
    exports: [
        AlphabetSelectorComponent

    ],
    providers: [

      ]
})
export class SharedUIModule { }


